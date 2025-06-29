import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useShowCurrentUser } from "../hooks/user";
import { useEffect } from "react";
import toast from "react-hot-toast";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, isPending } = useShowCurrentUser()

  const navigate = useNavigate()

  useEffect(() => {
    if(!currentUser?.user && !isPending) {
      toast.error("Session expired, please login")
      navigate("/login", { replace: true })
    }
  }, [currentUser?.user, isPending, navigate])

  if(isPending) return <LoadingSpinner />

  if(currentUser?.user) return children
}

export default ProtectedRoute