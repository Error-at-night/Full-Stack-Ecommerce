import { useState } from "react"

import CreateProductForm from "./CreateProductForm"

import { useDeleteProduct, useGetAllProducts } from "../../../hooks/product";

import { DeleteProductModal, Skeleton } from "../../../ui";
import { Link, useSearchParams } from 'react-router-dom';
import { Pencil, Search, Trash2 } from "lucide-react";
import Pagination from "../../../ui/Pagination";
import { useDebounce } from "use-debounce" 

function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [openCreateProductForm, setOpenCreateProductForm] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [debouncedSearch] = useDebounce(search, 800)

  const page = parseInt(searchParams.get("page") || "1", 10)
  const limit = 10
  
  const { data, isPending, isError, error } = useGetAllProducts(page, limit, debouncedSearch)
  const { deleteProduct, isPending: isDeleting } = useDeleteProduct()

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage), limit: String(limit) })
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    setSearchParams({ page: "1", limit: String(limit), search: value }) 
  }

  const handleOpenForm = () => {
    setOpenCreateProductForm(true)
  }

  const handleCloseForm = () => {
    setOpenCreateProductForm(false)
  } 

  const handleDeleteClick = (productId: string) => {
    setSelectedProductId(productId)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedProductId(null)
  }

  const handleConfirmDelete = () => {
    if(!selectedProductId) return
    deleteProduct(selectedProductId, {
      onSuccess: () => {
        handleCloseModal()
      }
    })
  }

  return (
    <main className="lg:ml-64 pt-40 lg:pt-42 px-4 pb-8">
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
        <div className="relative w-full md:max-w-[500px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input type="text" value={search} onChange={handleSearchChange} placeholder="Search products..."
            className="border px-3 py-2 rounded-md w-full border-[#DAE1E7]"
          />
        </div>
        <button type="submit" className="text-white ms-auto py-2 px-3 lg:py-2 mt-6 md:mt-0 w-full md:max-w-[130px] bg-black rounded-md cursor-pointer font-semibold"
          onClick={handleOpenForm}
        >
          Add product
        </button>
      </div>
      <CreateProductForm isOpen={openCreateProductForm} onClose={handleCloseForm}/>
      {isPending && <div className="pt-10"><Skeleton /></div>}
      {isError && <p className="text-gray-700 pt-10">{error?.message}</p>}
      {!isPending && !isError && <div className="mt-8 lg:mt-8">
        {data?.products && 
          <main className="min-h-screen">
            {data.products.length === 0 ?
              <h2 className="text-[1.2rem] sm:text-[1.3rem] md:text-[1.4rem] lg:text-[1.5rem] font-semibold text-gray-700">
                No product available
              </h2> :
              <div className="w-full grid grid-cols-12 gap-y-8 sm:gap-x-5">
                {data.products.map((product) => (
                  <div key={product._id}
                    className="bg-white w-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300
                      relative col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-3"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden border-b border-b-black/30">
                      <img  src={product.image} alt={product.name} className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-[1.125rem] font-bold mb-2 capitalize truncate">{product.name}</h2>
                      <p className="text-gray-600 mb-4">
                        <span className="truncate block">{product.description}</span>
                        <Link to={`${product._id}`} className="text-black text-[0.9rem] underline cursor-pointer font-semibold">
                          View more
                        </Link>
                      </p>
                      <p className="text-black font-medium text-[1.125rem]">${product.price.toLocaleString()}</p>
                      <p className={`absolute top-4 right-4 px-3 py-1 text-[0.8rem] font-bold rounded-full shadow-md 
                        ${product.stock > 10 ? "bg-green-100 text-green-700" : product.stock > 5
                          ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                      </p>
                      <div className="flex justify-between mt-5">
                        <button className="text-red-600 hover:text-red-800 cursor-pointer"
                          onClick={() => handleDeleteClick(product._id)}
                        >
                          <Trash2/>
                        </button>
                        <Link to={`${product._id}/edit`} className="text-black cursor-pointer"><Pencil/></Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }
            {selectedProductId && <DeleteProductModal isOpen={openModal} onClose={handleCloseModal} onConfirm={handleConfirmDelete} isPending={isDeleting}/>}
            <Pagination page={data.page || page} limit={data.limit || limit} total={data.total || 0} onPageChange={handlePageChange}/>
          </main>
        }
      </div>}
    </main>
  )
}

export default Products