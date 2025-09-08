import { useQuery } from "@tanstack/react-query"
import { getAllProducts as getAllProductsApi } from "../../services/product"

function useGetAllProducts() {
  const { data: products, isPending, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProductsApi
  })
  
  return { products, isPending, isError, error }
}

export default useGetAllProducts