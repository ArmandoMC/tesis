import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CreateProductDTO, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private API_URL='http://localhost:3000/api/products';
  constructor(
    private http:HttpClient
  ) { }

  getAllProducts(){
    return this.http.get<Product[]>(`${this.API_URL}`);
  }
  getProduct(id:string){
    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }
  create(dto:CreateProductDTO){
    return this.http.post<Product>(`${this.API_URL}`,dto);
  }

}
