import { useQuery } from "@tanstack/react-query"
import { getAllProducts as getAllProductsApi } from "../../services/product"

function useGetAllProducts() {
  const { data: products, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProductsApi
  })
  
  return { products, isPending }
}

export default useGetAllProducts