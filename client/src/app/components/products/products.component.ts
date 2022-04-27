import { Component, OnInit } from '@angular/core';
import { CreateProductDTO, Product } from 'src/app/models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = []
  today = new Date(2021, 1, 21);
  date = new Date(2021, 1, 21);
  showProductDetail = false;
  productChosen:Product={
    id:'',
    name:'',
    image:'',
    description:'',
    price:0,
    categoryId:0
  }

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService

  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
      .subscribe(data => {
        this.products = data;
      });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }
  onShowDetail(id:string){
    this.productsService.getProduct(id)
    .subscribe(data=>{
      console.log('product:', data);
      this.toggleProductDetail();
      this.productChosen=data;
    })
  }

  createNewProduct(){
    const product:CreateProductDTO={
      name:'nuevo producto',
      image:'http://placeimg.com/640/480',
      description:'my descripcion',
      price:999,
      categoryId:3

    }
    this.productsService.create(product)
    .subscribe(data=>{
      console.log('created', data);
      this.products.unshift(data);
    })
  }
}
