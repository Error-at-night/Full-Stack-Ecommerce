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
  imageId: string,
  // reviews:
  averageRating: number,
  numOfReviews: number
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

export type GetSingleProductResponse = {
  product: Product
}

export type DeleteProductResponse = {
  message: string
}
