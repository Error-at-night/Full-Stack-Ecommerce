import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { verifyEmail as verifyEmailApi } from '../../services/auth';

function useVerifyEmail() {
  const navigate = useNavigate()
  
  const { mutate: verifyEmail, isPending } = useMutation({
    mutationFn: verifyEmailApi,
    onSuccess: (data) => {
      toast.success(data.message || "Email verified")
      navigate("/login", { replace: true })
    },
    onError: (error) => {
      toast.error(error.message || "There was an error when trying to verify your email")
    }
  })
  
  return { verifyEmail, isPending }
}

export default useVerifyEmail