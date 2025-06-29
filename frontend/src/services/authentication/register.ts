import axiosInstance from "../../utils/axios"
import type { RegisterResponse } from "../../utils/axiosResponseTypes/authenticationTypes"
import { REGISTER_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers/getErrorMessage"

async function register(credentials: { 
  fullName: string, email: string, password: string, confirmPassword: string }): Promise<RegisterResponse> {
  try {
    const response = await axiosInstance.post(REGISTER_ENDPOINT, credentials) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default register