import axiosInstance from "../../utils/axios"
import { DELETE_PRODUCT_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers"
import type { DeleteProductResponse } from "../../utils/types/product"

const deleteProduct = async (id: string): Promise<DeleteProductResponse> => {
  try {
    const response = await axiosInstance.delete<DeleteProductResponse>(`${DELETE_PRODUCT_ENDPOINT}/${id}`) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default deleteProduct