import { useQuery } from "@tanstack/react-query"
import { showCurrentUser } from '../../services/user'
function useShowCurrentUser() {
  const { data: currentUser, isPending, isLoading, error, isError, isSuccess } =  useQuery({
    queryKey: ["currentUser"],
    queryFn: showCurrentUser,
  })
  
  return { currentUser, isPending, isLoading, error, isError, isSuccess }
}

export default useShowCurrentUser