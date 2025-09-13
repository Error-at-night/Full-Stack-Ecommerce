import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { deleteUser as deleteUserApi } from "../../services/user"

function useDeleteUser() {
  const queryClient = useQueryClient()

  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: async (data) => {
      toast.success(data.message || "User deleted successfully")
      await queryClient.invalidateQueries({ queryKey: ["users"] })
    },
    onError: (error) => {
      toast.error(error.message || "An error occured when deleting the user")
    }
  })
  
  return { deleteUser, isPending }
}

export default useDeleteUser