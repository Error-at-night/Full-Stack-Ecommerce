import axiosInstance from "../../utils/axios";
import { UPLOAD_IMAGE_ENDPOINT } from "../../utils/constants";
import { getErrorMessage } from "../../utils/helpers";
import type { UploadImageResponse } from "../../utils/types/product";

const uploadImage = async (file: File): Promise<UploadImageResponse> => {
  try {
    const formData = new FormData()
    formData.append("image", file)
    const response = await axiosInstance.post<UploadImageResponse>(UPLOAD_IMAGE_ENDPOINT, formData, { 
      headers: { "Content-Type": "multipart/form-data" }
    })
    return response.data
  }
  catch(error) {
    const errorMessage = getErrorMessage(error)
    throw new Error(errorMessage)
  } 
}

export default uploadImage