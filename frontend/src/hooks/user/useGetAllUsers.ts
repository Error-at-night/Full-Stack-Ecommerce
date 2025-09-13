import { useQuery } from "@tanstack/react-query"
import { getAllUsers as getAllUsersApi  } from '../../services/user'
function useGetAllUsers() {
  const { data: users, isPending, isError, error } =  useQuery({
    queryKey: ["users"],
    queryFn: getAllUsersApi,
  })
  
  return { users, isPending, isError, error }
}

export default useGetAllUsers