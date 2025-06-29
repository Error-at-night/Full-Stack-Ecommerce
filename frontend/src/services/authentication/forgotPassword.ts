import axiosInstance from "../../utils/axios"
import type { ForgotPasswordResponse } from "../../utils/axiosResponseTypes/authenticationTypes"
import { FORGOT_PASSWORD_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers/getErrorMessage"

async function forgotPassword(credentials: { email: string }): Promise<ForgotPasswordResponse> {
  try {
    const response = await axiosInstance.post(FORGOT_PASSWORD_ENDPOINT, credentials) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default forgotPassword