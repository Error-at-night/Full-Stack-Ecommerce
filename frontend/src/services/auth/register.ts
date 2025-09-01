import axiosInstance from "../../utils/axios"
import { REGISTER_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers"
import type { RegisterResponse } from "../../utils/types/auth"

const register = async (data: { 
    fullName: string, 
    email: string, 
    password: string, 
    confirmPassword: string 
  }
): Promise<RegisterResponse> =>  {
  try {
    const response = await axiosInstance.post<RegisterResponse>(REGISTER_ENDPOINT, data) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default register