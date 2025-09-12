import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteProduct, useGetSingleProduct } from "../../../../hooks/product";
import { DeleteProductModal, Skeleton } from "../../../../ui";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

function SingleProduct() {
  const { id } = useParams<{ id: string }>()
  
  const navigate = useNavigate()

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

  const { product, isPending, isError, error } = useGetSingleProduct(id)
  const { deleteProduct, isPending: isDeleting } = useDeleteProduct()

  const stock = product?.stock ?? 0
  const sizes = product?.size ?? []

  if(isPending) return <div className="lg:ml-64 pt-35 lg:pt-36 px-4"><Skeleton /></div>

  if(isError) return <p className="text-gray-700 lg:ml-64 pt-35 lg:pt-36 px-4">{error?.message}</p>

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
        navigate("/admin/products")
      }
    })
  }

  return (
    <main className="lg:ml-64 pt-35 lg:pt-36 px-4 overflow-x-hidden pb-6">
      <div className="max-w-full grid grid-cols-12 gap-x-12">
        {/*  */}
        <div className="col-span-12 md:col-span-6">
          <div className="aspect-[4/3] w-full overflow-hidden relative">
            <img src={product?.image} alt={product?.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4">
              <p className={`px-3 py-1 font-semibold rounded-full text-[0.97rem] sm:text-[0.99rem] shadow ${stock > 10
                ? "bg-green-100 text-green-700" : stock > 0 ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
                }`}
              >
                {stock > 0 ? `${stock} in stock` : "Out of stock"}
              </p>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="col-span-12 md:col-span-6 mt-5 lg:mt-0">
          <h2 className="text-[1.3rem] sm:text-[1.4rem] md:text-[1.5rem] xl:text-[1.875rem] 
            font-bold text-black capitalize break-words mb-5"
          >
            {product?.name}
          </h2>
          {/*  */}
          <div className="flex flex-wrap justify-between items-center mb-4">
            <p className="text-[1.2rem] sm:text-[1.3rem] md:text-[1.4rem] font-semibold text-gray-800">${product?.price}</p>
            <div className="flex items-center">
              <Link to={`edit`} className="text-black cursor-pointer mr-8 lg:mr-12">
                <Pencil />
              </Link>
              <button className="text-red-600 hover:text-red-800 cursor-pointer"
                onClick={() =>  product?._id && handleDeleteClick(product._id)}
              >
                <Trash2 />
              </button>
            </div>
          </div>
          {/* */}
          <div>
            <h3 className="text-[1.125rem] font-semibold text-gray-700">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product?.description}</p>
          </div>
          {/*  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="text-[0.97rem] font-semibold text-gray-500 capitalize">Category</h4>
              <p className="text-gray-700">{product?.category}</p>
            </div>
            <div>
              <h4 className="text-[0.97rem] font-semibold text-gray-500 capitalize">Subcategory</h4>
              <p className="text-gray-700">{product?.subCategory}</p>
            </div>
            <div>
              <h4 className="text-[0.97rem] font-semibold text-gray-500 capitalize">Brand</h4>
              <p className="text-gray-700">{product?.brand}</p>
            </div>
            <div>
              <h4 className="text-[0.97rem] font-semibold text-gray-500 capitalize">Featured</h4>
              <p className="text-gray-700">{product?.featured ? "Yes" : "No"}</p>
            </div>
          </div>
          {/*  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="text-[0.97rem] font-semibold text-gray-500 capitalize mb-1">
                {sizes?.length > 1 ? "Available Sizes" : "Available Size"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {sizes.length > 0 ? sizes.map((size) => <span key={size}
                    className="px-3 py-1 border rounded-md text-sm bg-gray-50 text-gray-700"
                  >
                    {size}
                  </span>
                  ) : <p className="text-gray-500">No size available</p>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteProductModal isOpen={openModal} onClose={handleCloseModal} onConfirm={handleConfirmDelete} isPending={isDeleting}/>
    </main>
  )
}

export default SingleProduct