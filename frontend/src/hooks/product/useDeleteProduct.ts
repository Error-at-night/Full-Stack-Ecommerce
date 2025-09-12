import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { deleteProduct as deleteProductApi } from "../../services/product"

function useDeleteProduct() {
  const queryClient = useQueryClient()

  const { mutate: deleteProduct, isPending } = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: async (data) => {
      toast.success(data.message || "Product added successfully")
      await queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onError: (error) => {
      toast.error(error.message || "An error occured while deleting the product")
    }
  })
  
  return { deleteProduct, isPending }
}

export default useDeleteProduct