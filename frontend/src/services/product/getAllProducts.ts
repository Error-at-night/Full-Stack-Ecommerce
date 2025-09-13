import axiosInstance from "../../utils/axios"
import { GET_ALL_PRODUCTS_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers"
import type { GetAllProductsResponse } from "../../utils/types/product"

const getAllProducts = async (page: number, limit: number): Promise<GetAllProductsResponse> => {
  try {
    const response = await axiosInstance.get<GetAllProductsResponse>(GET_ALL_PRODUCTS_ENDPOINT, {
      params: { 
        page, 
        limit 
      }
    }) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default getAllProducts