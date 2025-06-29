import axiosInstance from "../../utils/axios"
import type { VerifyEmailResponse } from "../../utils/axiosResponseTypes/authenticationTypes"
import { VERIFY_EMAIL_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers/getErrorMessage"

async function verifyEmail(credentials: { verificationCode: string }): Promise<VerifyEmailResponse> {
  try {
    const response = await axiosInstance.post(VERIFY_EMAIL_ENDPOINT, credentials) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default verifyEmail