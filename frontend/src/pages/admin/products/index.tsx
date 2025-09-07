import { useState } from "react"

import CreateProductForm from "./components/CreateProductForm"

import { useGetAllProducts } from "../../../hooks/product";

function Products() {
  const [openCreateProductForm, setOpenCreateProductForm] = useState<boolean>(false)

  const { products } = useGetAllProducts()

  console.log(products)

  return (
    <main className="lg:ml-64 pt-38 px-8 pl-6 lg:pl-8">
      <div className="flex justify-end items-center">
        <button type="submit" className="text-white bg-black px-3 py-2 rounded-md cursor-pointer font-semibold"
          onClick={() => setOpenCreateProductForm(true)}
        >
          Add product
        </button>
      </div>
      {openCreateProductForm && <CreateProductForm onClose={() => setOpenCreateProductForm(false)}/>}
      {}
    </main>
  )
}

export default Products