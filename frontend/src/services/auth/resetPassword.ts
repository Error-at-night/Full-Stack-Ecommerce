import axiosInstance from "../../utils/axios"
import { RESET_PASSWORD_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers"
import type { ResetPasswordResponse } from "../../utils/types/auth"

const resetPassword = async ({ password, confirmPassword, token }: 
  { 
    password: string, 
    confirmPassword: string, 
    token: string 
  }
): Promise<ResetPasswordResponse> => {
  try {
    const response = await axiosInstance.post<ResetPasswordResponse>(`${RESET_PASSWORD_ENDPOINT}/${token}`, {
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