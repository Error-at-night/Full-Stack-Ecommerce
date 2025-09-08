import ReactDOM from "react-dom";
import type { Product } from "../../../../utils/types/product";
import { X } from "lucide-react";

type ProductDetailsProps = {
  isOpen: boolean,
  onClose: () => void,
  selectedProduct: Product
}

function ProductDetails({ isOpen, onClose, selectedProduct }: ProductDetailsProps) {
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50 px-3 sm:px-6">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        {/*  */}
        <div className="flex justify-end items-center border-b px-6 py-4">
          <button onClick={onClose} className="text-gray-600 cursor-pointer hover:text-gray-900 transition"
          >
            <X size={30} />
          </button>
        </div>
        {/*  */}
        <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-100 flex items-center justify-center">
          <img src={selectedProduct.image} alt={selectedProduct.name} className="max-h-full max-w-full object-cover"/>
        </div>
        {/*  */}
        <div className="px-6 pt-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-800 capitalize">{selectedProduct.name}</h2>
        </div>
        {/*  */}
        <div className="px-6 py-4 space-y-4">
          <div className="flex flex-wrap justify-between items-center">
            <p className="text-2xl font-semibold text-black">${selectedProduct.price}</p>
            <p className={`px-3 py-1 rounded-full text-[1rem] shadow ${selectedProduct.stock > 10
              ? "bg-green-100 text-green-700" : selectedProduct.stock > 0 ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {selectedProduct.stock > 0 ? `${selectedProduct.stock} in stock` : "Out of stock"}
            </p>
          </div>
          {/*  */}
          <div>
            <h3 className="text-[1.125rem] font-semibold text-gray-700 mb-1">Description</h3>
            <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
          </div>
          {/*  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-[0.97rem] font-semibold text-gray-500 capitalize">Category</h4>
              <p className="text-gray-700">{selectedProduct.category}</p>
            </div>
            <div>
              <h4 className="text-[0.97rem] font-semibold text-gray-500 capitalize">Subcategory</h4>
              <p className="text-gray-700">{selectedProduct.subCategory}</p>
            </div>
            <div>
              <h4 className="text-[0.97rem] font-semibold text-gray-500 capitalize">Brand</h4>
              <p className="text-gray-700">{selectedProduct.brand}</p>
            </div>
            <div>
              <h4 className="text-[0.97rem] font-semibold text-gray-500 capitalize">Featured</h4>
              <p className="text-gray-700">{selectedProduct.featured ? "Yes" : "No"}</p>
            </div>
          </div>
          {/*  */}
          <div>
            <h4 className="text-[0.97rem] font-semibold text-gray-500 capitalize mb-1">
              {selectedProduct.size.length > 1 ? "Available Sizes" : "Available Size"}
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedProduct.size.length > 0 ? selectedProduct.size.map((size) => (
                  <span key={size} className="px-3 py-1 border rounded-md text-sm bg-gray-50 text-gray-700">
                    {size}
                  </span>
                )) : <p className="text-gray-500">No size available</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ProductDetails