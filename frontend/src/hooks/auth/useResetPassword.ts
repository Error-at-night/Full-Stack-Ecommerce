import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { resetPassword as resetPasswordApi } from "../../services/auth"

function useResetPassword() {
  const navigate = useNavigate()
  
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: (data) => {
      toast.success(data.message || "Password reset successful")
      navigate("/login", { replace: true })
    },
    onError: (error) => {
      toast.error(error.message || "There was an error when trying to reset your password")
    }
  })
  
  return { resetPassword, isPending }
}

export default useResetPassword