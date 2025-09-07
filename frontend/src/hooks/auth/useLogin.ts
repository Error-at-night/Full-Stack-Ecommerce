import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { login as loginApi } from "../../services/auth"

function useLogin() {
  const navigate = useNavigate()
  
  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      toast.success(data.message || "Login successful")
      navigate("/home", { replace: true })
    },
    onError: (error) => {
      toast.error(error.message || "There was an error when trying to log you in")
    }
  })
  
  return { login, isPending }
}

export default useLogin