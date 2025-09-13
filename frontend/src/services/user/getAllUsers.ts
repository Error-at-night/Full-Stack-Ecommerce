import axiosInstance from "../../utils/axios"
import { GET_ALL_USERS_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers"
import type { GetAllUsersResponse } from "../../utils/types/user"

const getAllUsers = async (page: number, limit: number, search: string): Promise<GetAllUsersResponse> => {
  try {
    const response =  await axiosInstance.get<GetAllUsersResponse>(GET_ALL_USERS_ENDPOINT, {
      params: { 
        page, 
        limit,
        search
      }
    })
    return response.data
  } catch(error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default getAllUsers