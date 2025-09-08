import axiosInstance from "../../utils/axios"
import { GET_SINGLE_PRODUCT_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers"
import type { GetSingleProductResponse, Product } from "../../utils/types/product"

const getSingleProduct = async (id: string): Promise<Product> => {
  try {
    const response = await axiosInstance.get<GetSingleProductResponse>(`${GET_SINGLE_PRODUCT_ENDPOINT}/${id}`) 
    return response.data.product
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default getSingleProduct