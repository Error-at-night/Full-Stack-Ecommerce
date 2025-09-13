import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { uploadImage as uploadImageAPI  } from "../../services/product"

function useUploadImage() {
  const { mutateAsync: uploadImage, isPending: uploadIsPending } = useMutation({
    mutationFn: uploadImageAPI,
    onError: (error: Error) => {
      toast.error(error.message || "An error occurred when uploading the image")
    }
  })

  return { uploadImage, uploadIsPending }
}

export default useUploadImage