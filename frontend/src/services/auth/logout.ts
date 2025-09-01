import axiosInstance from "../../utils/axios"
import { LOGOUT_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers"
import type { LogoutResponse } from "../../utils/types/auth"

const logout = async (): Promise<LogoutResponse> => {
  try {
    const response = await axiosInstance.delete<LogoutResponse>(LOGOUT_ENDPOINT) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default logout