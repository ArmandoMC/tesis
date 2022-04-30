import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { StoreService } from '../../services/store.service';
import { CategoriesService } from '../../services/categories.service';
import { Category } from 'src/app/models/category';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  isLoggedIn: boolean;
  loggedInUser: string;

  subscription: Subscription;
  counter=0;
  categories:Category[]=[];

  constructor(
    private auhtService: AuthService,
    private storeService: StoreService,
    private categoriesService:CategoriesService,
    private router: Router
  ) {

   }

  ngOnInit(): void {

    this.subscription = this.storeService.currentUser$.subscribe(
      data => {
        // console.log(currentUser.user.email)
          this.isLoggedIn = data.user.isLoggedIn;
          this.loggedInUser = data.user.email;

      },err=>{'error al subscribirse'}

    )
    //
    this.storeService.myCart$.subscribe(
      products=>{
          this.counter=products.length;
      }
    );

    this.getAllCategories();
  }

  ngOnDestroy():void{
      this.subscription?.unsubscribe();
  }

  logout(){
    this.auhtService.logout();
    this.isLoggedIn=false;
    this.router.navigate(['']);
  }

  getAllCategories(){
    this.categoriesService.getAll()
    .subscribe(data=>{
        this.categories=data;

        
    })
  }

}
