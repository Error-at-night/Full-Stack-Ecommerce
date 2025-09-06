import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { createProduct as createProductApi } from "../../services/product"

function useCreateProduct() {
  const { mutate: createProduct, isPending } = useMutation({
    mutationFn: createProductApi,
    onSuccess: (data) => {
      toast.success(data.message || "Product added successfully")
    },
    onError: (error) => {
      toast.error(error.message || "An error occured while adding the product")
    }
  })
  
  return { createProduct, isPending }
}

export default useCreateProduct