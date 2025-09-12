import { useState } from "react"

import CreateProductForm from "./CreateProductForm"
import ProductList from "./ProductList";

import { useGetAllProducts } from "../../../hooks/product";

import { Skeleton } from "../../../ui";

function Products() {
  const [openCreateProductForm, setOpenCreateProductForm] = useState<boolean>(false)

  const { products, isPending, isError, error } = useGetAllProducts()

  const handleOpenForm = () => {
    setOpenCreateProductForm(true)
  }

  const handleCloseForm = () => {
    setOpenCreateProductForm(false)
  } 

  return (
    <main className="lg:ml-64 pt-35 lg:pt-36 px-4 pb-8">
      <div className="flex justify-end items-center">
        <button type="submit" className="text-white bg-black px-3 py-2 rounded-md cursor-pointer font-semibold"
          onClick={handleOpenForm}
        >
          Add product
        </button>
      </div>
      <CreateProductForm isOpen={openCreateProductForm} onClose={handleCloseForm}/>
      <div className="mt-8 lg:mt-8">
        {isPending && <Skeleton />}
        {isError && <p className="text-gray-700">{error?.message}</p>}
        {!isPending && !isError && products && <ProductList products={products} />}
      </div>
    </main>
  )
}

export default Products