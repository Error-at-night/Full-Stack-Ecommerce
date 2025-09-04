import axiosInstance from "../../utils/axios"
import { REFRESH_TOKEN_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers"

const refreshToken = async () => {
  try {
    await axiosInstance.post(REFRESH_TOKEN_ENDPOINT)
  } catch(error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default refreshToken