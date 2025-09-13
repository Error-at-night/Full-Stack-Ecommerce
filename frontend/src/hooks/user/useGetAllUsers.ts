import { useQuery } from "@tanstack/react-query"
import { getAllUsers as getAllUsersApi  } from '../../services/user'
function useGetAllUsers() {
  const { data: users, isPending } =  useQuery({
    queryKey: ["users"],
    queryFn: getAllUsersApi,
  })
  
  return { users, isPending }
}

export default useGetAllUsers