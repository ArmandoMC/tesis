import { Injectable } from '@angular/core';
import {HttpClient,HttpParams,HttpErrorResponse,HttpStatusCode} from '@angular/common/http';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import{retry,catchError,map} from 'rxjs/operators';
import{throwError, zip} from 'rxjs';

import{environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private API_URL=`${environment.API_URL}/api/products`;
  constructor(
    private http:HttpClient
  ) { }

  getAllProducts(limit?:number, offset?:number){
    let params=new HttpParams();
    if(limit!==undefined && offset!==undefined){
      params=params.set('limit',limit);
      params=params.set('offset',offset);
    }
    return this.http.get<Product[]>(`${this.API_URL}`,{params})
    .pipe(
      map(products=>products.map(item=>{
        return{
          ...item,
          taxes: .19*item.price
        }
      }))
    )

  }
  getProduct(id:string){
    return this.http.get<Product>(`${this.API_URL}/${id}`)
    .pipe(
      catchError((error:HttpErrorResponse)=>{
        if(error.status===HttpStatusCode.Conflict){
          return throwError('algo esta fallando en el server');

        }
        if(error.status===HttpStatusCode.NotFound){
          return throwError('El producto no existe');

        }
        if(error.status===HttpStatusCode.Unauthorized){
          return throwError('no estas permitido');

        }
        return throwError('ups algo salió mal');
      })
    )


  }

  // fetchReadAndUpdate(id:string,dto:UpdateProductDTO){
  //   return zip(
  //     this.getProduct(id),
  //     this.update(id,dto)
  //   );
  // }

  getProductsbyPage(limit:number, offset:number){
    return this.http.get<Product[]>(`${this.API_URL}`,{
      params:{limit,offset}
    });

  }

  create(dto:CreateProductDTO){
    return this.http.post<Product>(`${this.API_URL}`,dto);
  }
  update(id:string,dto:UpdateProductDTO){
    return this.http.put<Product>(`${this.API_URL}/${id}`,dto);
  }
  detele(id:string){
    return this.http.delete<number>(`${this.API_URL}/${id}`);
  }


}
