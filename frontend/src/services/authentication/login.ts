import axiosInstance from "../../utils/axios"
import type { LoginResponse } from "../../utils/axiosResponseTypes/authenticationTypes"
import { LOGIN_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers/getErrorMessage"

async function login(credentials: { email: string, password: string }): Promise<LoginResponse> {
  try {
    const response = await axiosInstance.post(LOGIN_ENDPOINT, credentials) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default login