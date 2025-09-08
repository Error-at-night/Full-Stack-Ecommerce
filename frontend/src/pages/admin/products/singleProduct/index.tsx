import { useParams } from "react-router-dom";
import { useGetSingleProduct } from "../../../../hooks/product";
import { Skeleton } from "../../../../ui";

function SingleProduct() {
  const { id } = useParams<{ id: string }>()

  const { product, isPending, isError, error } = useGetSingleProduct(id)

  console.log(product)

  const stock = product?.stock ?? 0
  const sizes = product?.size ?? []

  if(isPending) return <div className="lg:ml-64 pt-35 lg:pt-36 px-4"><Skeleton /></div>

  if(isError) return <p className="text-gray-700 lg:ml-64 pt-35 lg:pt-36 px-4">{error?.message}</p>

  return (
    <div className="lg:ml-64 pt-35 lg:pt-36 px-4 overflow-x-hidden">
      <div className="w-full grid grid-cols-12 gap-y-8 sm:gap-x-5">
        <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
          <div className="aspect-[4/3] w-full overflow-hidden">
            <img src={product?.image} alt={product?.name} className="w-full h-full object-cover"/>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="pt-6 space-y-4">
        <h2 className="text-[1.5rem] xl:text-[1.875rem] font-bold text-black capitalize break-words">{product?.name}</h2>
      </div>
      {/*  */}
      <div className="py-4 space-y-4">
        <div className="flex flex-wrap justify-between items-center">
          <p className="text-[1.4rem] sm:text-[1.5rem] font-semibold text-gray-800">${product?.price}</p>
          <p className={`px-3 py-1 font-semibold rounded-full text-[0.97rem] sm:text-[1.1rem] shadow ${
            stock > 10 ? "bg-green-100 text-green-700" : stock > 0
                ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
            }`}
          >
            {stock > 0 ? `${stock} in stock` : "Out of stock"}
          </p>
        </div>
        {/*  */}
        <div>
          <h3 className="text-[1.125rem] font-semibold text-gray-700 mb-1">Description</h3>
          <p className="text-gray-600 leading-relaxed">{product?.description}</p>
        </div>
        {/*  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        <div>
          <h4 className="text-[0.97rem] font-semibold text-gray-500 capitalize mb-1">
            {sizes?.length > 1 ? "Available Sizes" : "Available Size"}
          </h4>
          <div className="flex flex-wrap gap-2">
            {sizes.length > 0 ? sizes.map((size) => (
                <span key={size} className="px-3 py-1 border rounded-md text-sm bg-gray-50 text-gray-700">
                  {size}
                </span>
              )) : <p className="text-gray-500">No size available</p>
            }
          </div>
        </div>
      </div>
      {/* review */}
      {/* <div>{product?.review}</div> */}
    </div>
  )
}

export default SingleProduct