import axiosInstance from "../../utils/axios"
import { GET_ALL_USERS_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers"
import type { GetAllUsersResponse, Users } from "../../utils/types/user"

const getAllUsers = async (): Promise<Users[]> => {
  try {
    const response =  await axiosInstance.get<GetAllUsersResponse>(GET_ALL_USERS_ENDPOINT)
    return response.data.users
  } catch(error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default getAllUsers