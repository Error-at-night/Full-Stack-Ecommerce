import axiosInstance from "../../utils/axios"
import { EDIT_PRODUCT_ENDPOINT } from "../../utils/constants"
import { getErrorMessage } from "../../utils/helpers"
import type { EditProductFormData } from "../../utils/types/admin"
import type { EditProductResponse } from "../../utils/types/product"

const editProduct = async ({ id, data }: { id: string, data: EditProductFormData}): Promise<EditProductResponse> => {
  try {
    const response = await axiosInstance.patch<EditProductResponse>(`${EDIT_PRODUCT_ENDPOINT}/${id}`, data) 
    return response.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  }
}

export default editProduct