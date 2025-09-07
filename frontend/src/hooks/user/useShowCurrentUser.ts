import { useQuery } from "@tanstack/react-query"
import { showCurrentUser as showCurrentUserApi  } from '../../services/user'
function useShowCurrentUser() {
  const { data: currentUser, isPending } =  useQuery({
    queryKey: ["currentUser"],
    queryFn: showCurrentUserApi,
  })
  
  return { currentUser, isPending }
}

export default useShowCurrentUser