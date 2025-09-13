import { useQuery } from "@tanstack/react-query"
import { getAllProducts as getAllProductsApi } from "../../services/product"

function useGetAllProducts(page: number, limit: number, search: string) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products",  page, limit, search],
    queryFn: () => getAllProductsApi(page, limit, search)
  })
  
  return {  data, isPending, isError, error }
}

export default useGetAllProducts