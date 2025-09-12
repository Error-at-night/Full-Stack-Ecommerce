export type CreateProductFormData = {
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
  imageId: string,
}

export type EditProductFormData = {
  _id: string,
  name: string,
  description: string,
  price: number,
  stock: number,
  category: string,
  subCategory: string,
  brand: string;
  size: string[],
  featured: boolean,
  image?: string,
  imageId?: string,
}

