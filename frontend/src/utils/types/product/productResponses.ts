export type CreateProductResponse = {
  message: string,
  product: {
    name: string,
    description: string,
    price: number,
    stock: number,
    category: string,
    subCategory: string,
    brand: string;
    size: string[],
    featured: boolean,
    image: string,
    imageId: string
  }
}

export type UploadImageResponse = {
  message: string,
  imageUrl: string,
  publicId: string
}

export type GetAllProductsResponse = {
  product: {
    name: string,
    description: string,
    price: number,
    stock: number,
    category: string,
    subCategory: string,
    brand: string;
    size: string[],
    featured: boolean,
    image: string,
    imageId: string
  }
}