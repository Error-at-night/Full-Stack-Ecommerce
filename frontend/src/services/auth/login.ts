import axiosInstance from "../../utils/axios"
import { LOGIN_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers"
import type { LoginResponse } from "../../utils/types/auth"

const login = async (data: { email: string, password: string }): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(LOGIN_ENDPOINT, data) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default login