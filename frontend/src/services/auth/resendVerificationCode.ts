import axiosInstance from "../../utils/axios"
import { RESEND_VERIFICATION_CODE_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers"
import type { ResendVerificationCodeResponse } from "../../utils/types/auth"

const resendVerificationCode = async (data: { email: string }): Promise<ResendVerificationCodeResponse> => {
  try {
    const response = await axiosInstance.post<ResendVerificationCodeResponse>(RESEND_VERIFICATION_CODE_ENDPOINT, data) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default resendVerificationCode