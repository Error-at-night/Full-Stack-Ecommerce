import { useQuery } from "@tanstack/react-query"
import { getSingleProduct as getSingleProductApi } from "../../services/product"

function useGetSingleProduct(id?: string) {
  const { data: product, isPending, isError, error } = useQuery({
    queryKey: ["singleProduct", id],
    queryFn: () => getSingleProductApi(id as string),
    enabled: !!id
  })
  
  return { product, isPending, isError, error }
}

export default useGetSingleProduct