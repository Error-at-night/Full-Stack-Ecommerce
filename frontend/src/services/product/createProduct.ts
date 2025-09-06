import axiosInstance from "../../utils/axios"
import { CREATE_PRODUCT_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers"
import type { CreateProductFormData } from "../../utils/types/admin"
import type { CreateProductResponse } from "../../utils/types/product"

const createProduct = async (data: CreateProductFormData): Promise<CreateProductResponse> => {
  try {
    const response = await axiosInstance.post<CreateProductResponse>(CREATE_PRODUCT_ENDPOINT, data) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default createProduct