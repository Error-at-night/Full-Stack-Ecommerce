import { useQuery } from "@tanstack/react-query"
import { getAllUsers as getAllUsersApi  } from '../../services/user'
function useGetAllUsers(page: number, limit: number, search: string) {
  const { data, isPending, isError, error } =  useQuery({
    queryKey: ["users", page, limit, search],
    queryFn: () => getAllUsersApi(page, limit, search),
  })
  
  return { data, isPending, isError, error }
}

export default useGetAllUsers