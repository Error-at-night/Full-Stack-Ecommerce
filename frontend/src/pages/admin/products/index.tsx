import { useState } from "react"

import CreateProductForm from "./components/CreateProductForm"
import ProductList from "./components/ProductList";

import { useGetAllProducts } from "../../../hooks/product";

import { Skeleton } from "../../../ui";

function Products() {
  const [openCreateProductForm, setOpenCreateProductForm] = useState<boolean>(false)

  const { products, isPending } = useGetAllProducts()

  return (
    <main className="lg:ml-64 pt-35 lg:pt-36 px-4">
      <div className="flex justify-end items-center">
        <button type="submit" className="text-white bg-black px-3 py-2 rounded-md cursor-pointer font-semibold"
          onClick={() => setOpenCreateProductForm(true)}
        >
          Add product
        </button>
      </div>
      {openCreateProductForm && <CreateProductForm onClose={() => setOpenCreateProductForm(false)}/>}
        
      <div className="mt-8 lg:mt-8">
        {isPending ? <Skeleton/> : products && <ProductList products={products} />}
      </div>
    </main>
  )
}

export default Products