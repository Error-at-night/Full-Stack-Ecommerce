import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { forgotPassword as forgotPasswordApi } from '../../services/auth'
import { useState } from "react";

function useForgotPassword() {
  const [emailSent, setEmailSent] = useState<boolean>(false)
  
  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: (data) => {
      setEmailSent(true)
      toast.success(data.message || "Please check your email for the reset password link")
    },
    onError: (error) => {
      setEmailSent(false)
      toast.error(error.message || "There was an error when trying to send reset password link")
    }
  })
  
  return { forgotPassword, isPending, emailSent }
}

export default useForgotPassword