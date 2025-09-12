import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { editProduct as editProductApi } from "../../services/product"
import { useNavigate } from "react-router-dom"

function useEditProduct() {
  const queryClient = useQueryClient()
   const navigate = useNavigate()

  const { mutate: editProduct, isPending } = useMutation({
    mutationFn: editProductApi,
    onSuccess: async (data, product) => {
      toast.success(data.message || "Product updated successfully")
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["products"] }),
        queryClient.invalidateQueries({ queryKey: ["singleProduct", product.id] })
      ])
      navigate("/admin/products", { replace: true })
    },
    onError: (error) => {
      toast.error(error.message || "An error occured while updating the product")
    }
  })
  
  return { editProduct, isPending }
}

export default useEditProduct