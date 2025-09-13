import axiosInstance from "../../utils/axios"
import { DELETE_USER_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers"
import type { DeleteUserResponse } from "../../utils/types/user"

const deleteUser = async (id: string): Promise<DeleteUserResponse> => {
  try {
    const response = await axiosInstance.delete<DeleteUserResponse>(`${DELETE_USER_ENDPOINT}/${id}`) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default deleteUser