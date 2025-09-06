import axiosInstance from "../../utils/axios"
import { VERIFY_EMAIL_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers"
import type { VerifyEmailFormData, VerifyEmailResponse } from "../../utils/types/auth"

const verifyEmail = async (data: VerifyEmailFormData): Promise<VerifyEmailResponse> => {
  try {
    const response = await axiosInstance.post<VerifyEmailResponse>(VERIFY_EMAIL_ENDPOINT, data) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default verifyEmail