import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { createProduct as createProductApi } from "../../services/product"

function useCreateProduct() {
  const queryClient = useQueryClient()

  const { mutate: createProduct, isPending } = useMutation({
    mutationFn: createProductApi,
    onSuccess: async (data) => {
      toast.success(data.message || "Product added successfully")
      await queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onError: (error) => {
      toast.error(error.message || "An error occured when adding the product")
    }
  })
  
  return { createProduct, isPending }
}

export default useCreateProduct