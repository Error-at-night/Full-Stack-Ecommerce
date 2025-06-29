import axiosInstance from "../../utils/axios"
import type { ResendVerificationCodeResponse } from "../../utils/axiosResponseTypes/authenticationTypes"
import { RESEND_VERIFICATION_CODE_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers/getErrorMessage"

async function resendVerificationCode(credentials: { email: string }): Promise<ResendVerificationCodeResponse> {
  try {
    const response = await axiosInstance.post(RESEND_VERIFICATION_CODE_ENDPOINT, credentials) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default resendVerificationCode