export type Product = {
  _id: string,
  name: string,
  description: string
  price: number
  stock: number
  category: string
  subCategory: string
  brand: string
  size: string[]
  featured: boolean
  image: string
  imageId: string
}

export type CreateProductResponse = {
  message: string,
  product: Product
}

export type UploadImageResponse = {
  message: string,
  imageUrl: string,
  publicId: string
}

export type GetAllProductsResponse = {
  products: Product[]
}
