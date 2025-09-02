import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from ".";
import { useShowCurrentUser } from "../hooks/user";
import { useEffect } from "react";
import toast from "react-hot-toast";

type ProtectedRouteProps = {
  children: React.ReactNode,
  roles?: string[]
}

function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { currentUser, isPending } = useShowCurrentUser()

  const navigate = useNavigate()

  useEffect(() => {
    if(!isPending) {
      if(!currentUser?.user) {
        toast.error("Session expired, please login")
        navigate("/login", { replace: true })
      } else if(roles && currentUser?.user && !roles.includes(currentUser.user.role)) {
        toast.error("Unauthorized access")
        navigate("/home", { replace: true })
      }
    }
  }, [currentUser?.user, isPending, navigate, roles])

  if(isPending) return <LoadingSpinner />

  if(currentUser?.user) return <>{children}</>

  return null
}

export default ProtectedRoute