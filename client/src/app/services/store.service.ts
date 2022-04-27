import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'
import { Auth } from '../models/auth.model';
import { Product } from '../models/product.model';

@Injectable({providedIn:'root'})
export class StoreService {

  private currentUserSubject: BehaviorSubject<Auth> = new BehaviorSubject<Auth>({ user: {}, token: '' } as Auth);
  public readonly currentUser$: Observable<Auth> = this.currentUserSubject.asObservable();


  private myShoppingCart: Product[] = [];
  private myCart=new BehaviorSubject<Product[]>([]);

  myCart$=this.myCart.asObservable();

  total=0;


  constructor(
  ) { }

  setCurrentUser(currentUser: Auth) {
    this.currentUserSubject.next(currentUser);
  }

  getShoppingCart(){
    return this.myShoppingCart;
  }

  addProduct(product: Product) {
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }

  getTotal() {
    return this.total = this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);

  }
}
