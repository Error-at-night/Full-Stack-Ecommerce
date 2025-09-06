import axiosInstance from "../../utils/axios"
import { REGISTER_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers"
import type { RegisterFormData, RegisterResponse } from "../../utils/types/auth"

const register = async (data: RegisterFormData): Promise<RegisterResponse> =>  {
  try {
    const response = await axiosInstance.post<RegisterResponse>(REGISTER_ENDPOINT, data) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default register