import axiosInstance from "../../utils/axios"
import { REFRESH_TOKEN_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers"
import type { RefreshTokenResponse } from "../../utils/types/auth"

const refreshToken = async (): Promise<RefreshTokenResponse> => {
  try {
    const response = await axiosInstance.post<RefreshTokenResponse>(REFRESH_TOKEN_ENDPOINT)
    return response.data
  } catch(error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default refreshToken