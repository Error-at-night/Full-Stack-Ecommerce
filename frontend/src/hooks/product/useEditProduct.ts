import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { editProduct as editProductApi } from "../../services/product"

function useEditProduct() {
  const queryClient = useQueryClient()

  const { mutate: editProduct, isPending } = useMutation({
    mutationFn: editProductApi,
    onSuccess: async (data, product) => {
      toast.success(data.message || "Product updated successfully")
      queryClient.invalidateQueries({ queryKey: ["products"] })
      queryClient.invalidateQueries({ queryKey: ["singleProduct", product.id] })
    },
    onError: (error) => {
      toast.error(error.message || "An error occured while updating the product")
    }
  })
  
  return { editProduct, isPending }
}

export default useEditProduct