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
}

export interface CreateProductDTO extends Omit<Product,'id'>{}
