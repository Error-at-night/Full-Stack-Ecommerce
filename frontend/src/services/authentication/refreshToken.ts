import axiosInstance from "../../utils/axios"
import type { RefreshTokenResponse } from "../../utils/axiosResponseTypes/authenticationTypes"
import { REFRESH_TOKEN_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers/getErrorMessage"

async function refreshToken(): Promise<RefreshTokenResponse> {
  try {
    const response = await axiosInstance.get(REFRESH_TOKEN_ENDPOINT)
    return response.data
  } catch(error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default refreshToken