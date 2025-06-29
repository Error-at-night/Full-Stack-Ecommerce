import axiosInstance from "../../utils/axios"
import type { LogoutResponse } from "../../utils/axiosResponseTypes/authenticationTypes"
import { LOGOUT_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers/getErrorMessage"

async function logout(): Promise<LogoutResponse> {
  try {
    const response = await axiosInstance.delete(LOGOUT_ENDPOINT) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default logout