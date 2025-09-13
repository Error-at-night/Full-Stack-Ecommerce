import { useQuery } from "@tanstack/react-query"
import { getAllProducts as getAllProductsApi } from "../../services/product"

function useGetAllProducts(page: number, limit: number) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products",  page, limit],
    queryFn: () => getAllProductsApi(page, limit)
  })
  
  return {  data, isPending, isError, error }
}

export default useGetAllProducts