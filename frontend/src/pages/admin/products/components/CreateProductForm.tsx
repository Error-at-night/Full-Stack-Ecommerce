import { X } from "lucide-react"

import { useForm, Controller, type SubmitHandler } from "react-hook-form";

import type { CreateProductFormData } from "../../../../utils/types/admin"

import Select from "react-select";

import { useCreateProduct, useUploadImage } from "../../../../hooks/product";

import { ButtonSpinner } from "../../../../ui";

import { twoDecimalPlacePattern } from "../../../../utils/regexPatterns";

type CreateProductProps = {
  onClose: () => void
}

const sizeOptions = [
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
  { value: "XXL", label: "XXL" }
]

function CreateProductForm({ onClose }: CreateProductProps) {
  const { createProduct, isPending } = useCreateProduct()
  const { uploadImage, uploadIsPending } = useUploadImage()

  const { control, register, handleSubmit, setValue, formState: { errors }, reset } = useForm<CreateProductFormData>({
    defaultValues: {
      size: []
    }
  })

  const onSubmit: SubmitHandler<CreateProductFormData> = (data) => {
    createProduct(data, { onSuccess: () => {
        reset()
        onClose()
      }
    })
  }

  return (
    <aside>
      <div className="fixed inset-0 flex justify-end">
        <div className="w-full max-w-[600px] shadow-2xl px-8 pb-10 bg-white pt-2 h-full min-h-screen overflow-y-auto">
            <div className="flex mb-5 mt-6 items-center justify-between">
              <button onClick={onClose}
                className="cursor-pointer text-white"  
              >
                <X size={30} className="text-black"/>
              </button>
            </div>
            <form className="w-full mt-10" onSubmit={handleSubmit(onSubmit)}>
              {/*  */}
              <div className="flex flex-col">
                <label htmlFor="product-name" className="text-[#2B3445] font-semibold mb-2">
                  Product Name
                </label>
                <input type="text" id="product-name" minLength={10} maxLength={100} placeholder="e.g. Nike Airforce" className={`${errors.name ? 
                  "border-red-500 focus:border-red-500 focus:outline-none" : "border-[#DAE1E7]"} border w-full py-2 px-4 rounded-md`}
                  {...register("name", { required: "Please provide the product name",
                    maxLength: { value: 100, message: "Product name cannot exceed 100 characters" },
                    minLength: { value: 10, message: "Product name must be at least 10 characters" }
                  })}
                  disabled={isPending}
                />
                {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
              </div>
              {/*  */}
              <div className="flex flex-col my-8">
                <label htmlFor="image" className="text-[#2B3445] font-semibold mb-2">
                  Upload Image
                </label>
                <input type="file" id="image" accept="image/*" required disabled={uploadIsPending}
                  className="border w-full py-2 px-4 rounded-md border-[#DAE1E7]"
                  onInvalid={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("Please upload an image for the product")}
                  onInput={(e) => (e.currentTarget as HTMLInputElement).setCustomValidity("")}
                  onChange={async (e) => { const file = e.target.files?.[0]
                    if(file) {
                      const url = await uploadImage(file)
                      if(url) {
                        setValue("image", url.imageUrl, { shouldValidate: true })
                        setValue("imageId", url.publicId, { shouldValidate: true })
                      }
                    }
                  }}
                />
              </div>
              {/*  */}
              <div className="flex flex-col">
                <label htmlFor="product-description" className="text-[#2B3445] font-semibold mb-2">
                  Description
                </label>
                <textarea maxLength={300} placeholder="Write a description about the product" id="product-description" rows={5}
                  className={`${errors.description ? "border-red-500 focus:border-red-500 focus:outline-none" : 
                    "border-[#DAE1E7]"} border w-full py-2 px-4 rounded-md`}
                  {...register("description", { required: "Please write a description for the product",
                    maxLength: { value: 300, message: "Description cannot exceed 300 characters" },
                    minLength: { value: 50, message: "Description must be at least 50 characters" }
                  })}
                  disabled={isPending}
                />
                {errors.description && <p className="text-red-500 mt-1">{errors.description.message}</p>}
              </div>
              {/*  */}
              <div className="flex flex-col my-8">
                <label htmlFor="product-size">Select Sizes</label>
                <Controller name="size" control={control} rules={{ required: "Please select at least one size" }} disabled={isPending}
                  render={({ field }) => (
                    <Select {...field} isMulti options={sizeOptions}
                      value={sizeOptions.filter((opt) => field.value?.includes(opt.value))}
                      onChange={(selected) => field.onChange(selected.map((opt) => opt.value))}
                    />
                  )}
                />
                {errors.size && <p className="text-red-500 mt-1">{errors.size.message}</p>}
              </div>
              {/*  */}
              <div className="flex flex-col">
                <label htmlFor="product-price" className="text-[#2B3445] font-semibold mb-2">Price</label>
                <input type="number" id="product-price" placeholder="e.g. 100" step="0.01" className={`${errors.price ? 
                  "border-red-500 focus:border-red-500 focus:outline-none" : "border-[#DAE1E7]"} border w-full py-2 px-4 rounded-md`}
                  {...register("price", { required: "Please provide a price for the product", min: { value: 0.01, message: "Price must be greater than 0"},
                    validate: (value) => twoDecimalPlacePattern.test(value.toString()) || "Price must be a valid amount (e.g. 100)"
                  })} 
                  disabled={isPending}
                />
                {errors.price && <p className="text-red-500 mt-1">{errors.price.message}</p>}
              </div>
              {/*  */}
              <div className="flex flex-col my-8">
                <label htmlFor="stock" className="text-[#2B3445] font-semibold mb-2">Stock</label>
                <input type="number" id="stock" min={1} max={100} step={1} placeholder="e.g. 50" {...register("stock", { required: "Stock quantity is required",
                    min: { value: 1, message: "Stock must be at least 1" }, max: { value: 100, message: "Stock cannot exceed 100" },
                    validate: (value) => Number.isInteger(Number(value)) || "Stock must be a whole number"  
                  })}
                  className={`${errors.stock ? "border-red-500 focus:border-red-500 focus:outline-none" : 
                  "border-[#DAE1E7]"} border w-full py-2 px-4 rounded-md`} disabled={isPending}
                />
                {errors.stock && <p className="text-red-500 mt-1">{errors.stock.message}</p>}
              </div>
              {/*  */}
              <div className="flex flex-col">
                <label htmlFor="category" className="text-[#2B3445] font-semibold mb-2">Category</label>
                <select id="category" defaultValue="" {...register("category", { required: "Please select a category" })} 
                  className={`${errors.category ? "border-red-500 focus:border-red-500 focus:outline-none" : 
                    "border-[#DAE1E7]"} border w-full py-2 pl-3 rounded-md`} disabled={isPending}
                >
                  <option value="" disabled>Select category</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                </select>
                {errors.category && <p className="text-red-500 mt-1">{errors.category.message}</p>}
              </div>
              <div className="flex flex-col my-8">
                <label htmlFor="sub-category" className="text-[#2B3445] font-semibold mb-2">Sub Category</label>
                <select id="sub-category" defaultValue="" {...register("subCategory", { required: "Please select a sub category" })} 
                  className={`${errors.subCategory ? "border-red-500 focus:border-red-500 focus:outline-none" : 
                    "border-[#DAE1E7]"} border w-full py-2 pl-3 rounded-md`} disabled={isPending}
                >
                  <option value="" disabled>Select sub category</option>
                  <option value="Shirt">Shirt</option>
                  <option value="Trouser">Trouser</option>
                  <option value="Shoe">Shoe</option>
                  <option value="Watch">Watch</option>
                  <option value="Bag">Bag</option>
                </select>
                {errors.subCategory && <p className="text-red-500 mt-1">{errors.subCategory.message}</p>}
              </div>
              <div className="flex flex-col my-8">
                <label htmlFor="brand" className="text-[#2B3445] font-semibold mb-2">Brand Name</label>
                <input type="text" id="brand" placeholder="e.g. Gucci" {...register("brand", { required: "Please provide a brand name for the product" })} 
                  className={`${errors.brand ? "border-red-500 focus:border-red-500 focus:outline-none" : 
                  "border-[#DAE1E7]"} border w-full py-2 pl-3 rounded-md`} disabled={isPending}
                />
                {errors.brand && <p className="text-red-500 mt-1">{errors.brand.message}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="featured" className="text-[#2B3445] font-semibold mb-2">Featured</label>
                <select id="featured" {...register("featured", { required: "Please select an option", 
                  setValueAs: (val) => { if(val === "true") return true
                      if(val === "false") return false
                      return undefined
                    }
                  })} 
                  className={`${errors.featured ? "border-red-500 focus:border-red-500 focus:outline-none" : 
                    "border-[#DAE1E7]"} border w-full py-2 pl-3 rounded-md`} disabled={isPending}
                >
                  <option value="" disabled>Select an option</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
                 {errors.featured && <p className="text-red-500 mt-1">{errors.featured.message}</p>}
              </div>
              <div className="mt-8">
                <button type="submit" className="text-white bg-black px-3 py-3 w-full rounded-md cursor-pointer font-semibold"
                  disabled={isPending}
                >
                  {isPending ? <ButtonSpinner/> : "Add product"}
                </button>
              </div>
            </form>
          </div>
        </div>
    </aside>
  )
}

export default CreateProductForm