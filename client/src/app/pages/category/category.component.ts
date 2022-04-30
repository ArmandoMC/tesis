import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  limit = 5;
  offset = 0;
  products: Product[] = []
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.categoryId = params.get('id');
          if (this.categoryId) {
            return this.productsService.getByCategory(this.categoryId, this.limit, this.offset);
          }
          return [];
        })
      )
      .subscribe(data => {
        this.products = data;
        this.offset+=this.limit;
      })
  }

  onLoadMore(){
    if(this.categoryId){
      this.productsService.getByCategory(this.categoryId,this.limit,this.offset)
      .subscribe(data => {
        this.products=this.products.concat(data);
        this.offset+=this.limit;
      });
    }

  }


}
