export interface Category{
  id:number;
  name:string;
}

export interface Product{

  id:string;
  name:string;
  image:string;
  description:string;
  price:number;
  categoryId:number;
  taxes?:number;
}

export interface CreateProductDTO extends Omit<Product,'id'>{}

export interface UpdateProductDTO extends Partial< CreateProductDTO>{}
