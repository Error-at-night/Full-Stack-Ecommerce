import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { logout as logoutApi } from '../../services/auth';
import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate()

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: (data) => {
      toast.success(data.message || "Logout successful")
      navigate("/login", { replace: true })
    },
    onError: (error) => {
      toast.error(error.message || "There was an error when trying to log you out")
    }
  })
  
  return { logout, isPending }
}

export default useLogout