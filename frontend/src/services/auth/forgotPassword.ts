import axiosInstance from "../../utils/axios"
import { FORGOT_PASSWORD_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers"
import type { ForgotPasswordFormData, ForgotPasswordResponse } from "../../utils/types/auth"

const forgotPassword = async (data: ForgotPasswordFormData): Promise<ForgotPasswordResponse> => {
  try {
    const response = await axiosInstance.post<ForgotPasswordResponse>(FORGOT_PASSWORD_ENDPOINT, data) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default forgotPassword