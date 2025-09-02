import { useQuery } from "@tanstack/react-query"
import { showCurrentUser } from '../../services/user'
function useShowCurrentUser() {
  const { data: currentUser, isPending } =  useQuery({
    queryKey: ["currentUser"],
    queryFn: showCurrentUser,
  })
  
  return { currentUser, isPending }
}

export default useShowCurrentUser