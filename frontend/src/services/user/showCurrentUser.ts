import axiosInstance from "../../utils/axios"
import { SHOW_CURRENT_USER_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers"
import type { ShowCurrentUserResponse } from "../../utils/types/user"

const showCurrentUser = async (): Promise<ShowCurrentUserResponse> => {
  try {
    const response =  await axiosInstance.get<ShowCurrentUserResponse>(SHOW_CURRENT_USER_ENDPOINT)
    return response.data
  } catch(error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default showCurrentUser