import { Component, OnInit,Input ,Output,EventEmitter} from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent  {

  @Input()product:Product={
    id:'',
    name:'',
    image:'',
    description:'',
    price:0,
    categoryId:0

  }

  @Output() addedProduct=new EventEmitter<Product>();
  @Output() showProduct=new EventEmitter<string>();

  constructor() { }



  onAddToCart(){
    this.addedProduct.emit(this.product);
  }
  onShowDetail(){
    this.showProduct.emit(this.product.id);
  }
}
