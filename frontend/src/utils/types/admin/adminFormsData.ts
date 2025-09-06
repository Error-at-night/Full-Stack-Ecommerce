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