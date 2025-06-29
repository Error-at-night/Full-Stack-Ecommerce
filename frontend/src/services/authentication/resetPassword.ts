import axiosInstance from "../../utils/axios"
import type { ResetPasswordResponse } from "../../utils/axiosResponseTypes/authenticationTypes"
import { RESET_PASSWORD_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers/getErrorMessage"

async function resetPassword({ password, confirmPassword, token }: 
  { password: string, confirmPassword: string, token: string }): Promise<ResetPasswordResponse> {
  try {
    const response = await axiosInstance.post(`${RESET_PASSWORD_ENDPOINT}/${token}`, {
      password,
      confirmPassword
    }) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default resetPassword