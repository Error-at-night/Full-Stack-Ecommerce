import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { BASE_URL } from "./constants";
import toast from "react-hot-toast";
import { navigate } from "./helpers";
import { refreshToken } from "../services/auth";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}

let isRefreshing = false

let failedQueue: {
  resolve: (value?: unknown) => void
  reject: (error: unknown) => void
}[] = []

const processQueue = (error: unknown, tokenRefreshed = false) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error)
    } else {
      promise.resolve(tokenRefreshed)
    }
  })
  failedQueue = []
}

const axiosInstance = axios.create({
  baseURL: BASE_URL, 
  withCredentials: true,
  timeout: 50000,
})

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig

    if(error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes("/auth/refresh-token")) {
      if(isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => axiosInstance(originalRequest))
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        await refreshToken()
        processQueue(null, true)
        return axiosInstance(originalRequest)
      } catch(err) {
        processQueue(err, false)
        toast.error("Session expired, please login")
        navigate("/login")
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance