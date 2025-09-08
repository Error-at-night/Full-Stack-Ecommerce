import { useState } from "react"

import type { Product } from "../../../../utils/types/product"

import { Pencil, Trash2 } from "lucide-react"

import ProductDetails from "./ProductDetails"

type ProductListProps = {
  products: Product[]
}

function ProductList({ products }: ProductListProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [openModal, setOpenModal] = useState<boolean>(false)

  return(
    <main className="min-h-screen">
      {products.length === 0 ?
        <h2 className="text-[1.2rem] sm:text-[1.3rem] md:text-[1.4rem] lg:text-[1.5rem] font-semibold text-gray-700">
          No product available
        </h2> :
        <div className="w-full grid grid-cols-12 gap-y-8 sm:gap-x-5">
          {products.map((product) => (
            <div key={product._id}
              className="bg-white w-full rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300
                relative col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-3"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <img  src={product.image} alt={product.name} className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 capitalize">{product.name}</h2>
                <p className="text-gray-600 mb-4">
                  <span>{product.description.slice(0, 39)}...</span>
                  <button className="text-black text-[0.9rem] ml-1 underline cursor-pointer"
                    onClick={() => { setSelectedProduct(product); setOpenModal(true) }}
                  >
                    see more
                  </button>
                </p>
                <p className="text-black font-bold text-lg">${product.price}</p>
                <p className={`absolute top-4 right-4 px-3 py-1 text-[0.8rem] font-semibold rounded-full shadow-md 
                  ${product.stock > 10 ? "bg-green-100 text-green-700" : product.stock > 0 
                    ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </p>
                <div className="flex justify-end space-x-3 mt-auto">
                  <button className="text-black cursor-pointer"><Pencil/></button>
                  <button className="text-red-600 hover:text-red-800 cursor-pointer"><Trash2/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      }
      {openModal && selectedProduct && 
        <ProductDetails isOpen={openModal} selectedProduct={selectedProduct} onClose={(() => setOpenModal(false))}/>
      }
    </main>
  )
}

export default ProductList