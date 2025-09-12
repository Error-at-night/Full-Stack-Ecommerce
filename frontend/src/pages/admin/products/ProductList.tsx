import type { Product } from "../../../utils/types/product"

import { Pencil, Trash2 } from "lucide-react"

import { useState } from "react"

import { Link } from "react-router-dom"

import { DeleteProductModal } from "../../../ui"

import { useDeleteProduct } from "../../../hooks/product"

type ProductListProps = {
  products: Product[]
}

function ProductList({ products }: ProductListProps) {  
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

  const { deleteProduct, isPending: isDeleting } = useDeleteProduct()

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

  return(
    <main className="min-h-screen">
      {products.length === 0 ?
        <h2 className="text-[1.2rem] sm:text-[1.3rem] md:text-[1.4rem] lg:text-[1.5rem] font-semibold text-gray-700">
          No product available
        </h2> :
        <div className="w-full grid grid-cols-12 gap-y-8 sm:gap-x-5">
          {products.map((product) => (
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
                <p className="text-black font-medium text-[1.125rem]">${product.price}</p>
                <p className={`absolute top-4 right-4 px-3 py-1 text-[0.8rem] font-bold rounded-full shadow-md 
                  ${product.stock > 10 ? "bg-green-100 text-green-700" : product.stock > 0 
                    ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </p>
                <div className="flex justify-between mt-5">
                  <button className="text-red-600 hover:text-red-800 cursor-pointer font-bold"
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
    </main>
  )
}

export default ProductList