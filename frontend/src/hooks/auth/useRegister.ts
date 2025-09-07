import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { register as registerApi } from "../../services/auth"

function useRegister() {
  const navigate = useNavigate()
  
  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      toast.success(data.message || "Please verify your email address")
      navigate("/verify-email", { replace: true })
    },
    onError: (error) => {
      toast.error(error.message || "There was an error when trying to sign you up")
    }
  })
  
  return { registerUser, isPending }
}

export default useRegister