import { useState } from "react"

import CreateProductForm from "./CreateProductForm"

import { useDeleteProduct, useGetAllProducts } from "../../../hooks/product";

import { DeleteProductModal, Skeleton } from "../../../ui";
import { Link, useSearchParams } from 'react-router-dom';
import { Pencil, Trash2 } from "lucide-react";
import Pagination from "./Pagination";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [openCreateProductForm, setOpenCreateProductForm] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

  const page = parseInt(searchParams.get("page") || "1", 10)
  const limit = 10
  
  const { data, isPending, isError, error } = useGetAllProducts(page, limit)
  const { deleteProduct, isPending: isDeleting } = useDeleteProduct()

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage), limit: String(limit) })
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
    if (!selectedProductId) return
    deleteProduct(selectedProductId, {
      onSuccess: () => {
        handleCloseModal()
      }
    })
  }

  if(isPending) return <div className="lg:ml-64 pt-35 lg:pt-36 px-4"><Skeleton /></div>

  if(isError) return <p className="text-gray-700 lg:ml-64 pt-35 lg:pt-36 px-4">{error?.message}</p>

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
            <DeleteProductModal isOpen={openModal} onClose={handleCloseModal} onConfirm={handleConfirmDelete} isPending={isDeleting}/>
            <Pagination page={data.page || page} limit={data.limit || limit} total={data.total || 0} onPageChange={handlePageChange}/>
          </main>
        }
      </div>
    </main>
  )
}

export default Products