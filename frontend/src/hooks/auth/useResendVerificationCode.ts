import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { resendVerificationCode as resendVerificationCodeApi } from "../../services/auth"

function useResendVerificationCode() {
  const navigate = useNavigate()
  
  const { mutate: resendVerificationCode, isPending } = useMutation({
    mutationFn: resendVerificationCodeApi,
    onSuccess: (data) => {
      toast.success(data.message || "Verification code resent. Please check your inbox.")
      navigate("/verify-email", { replace: true })
    },
    onError: (error) => {
      toast.error(error.message || "There was an error when trying to resend the verification code")
    }
  })
  
  return { resendVerificationCode, isPending }
}

export default useResendVerificationCode