import axiosInstance from "../../utils/axios"
import { GET_ALL_PRODUCTS_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers"
import type { GetAllProductsResponse } from "../../utils/types/product"

const getAllProducts = async (): Promise<GetAllProductsResponse> => {
  try {
    const response = await axiosInstance.get<GetAllProductsResponse>(GET_ALL_PRODUCTS_ENDPOINT) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default getAllProducts