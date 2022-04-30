import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductsComponent } from './components/products/products.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CategoryComponent } from './pages/category/category.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path: 'home', component:HomeComponent
  },
  {
    path: 'category/:id', component:CategoryComponent
  },
  {
    path: 'profile', component:ProfileComponent
  },
  {
    path: 'my-cart', component:MyCartComponent
  },
  {
    path: 'recovery', component:RecoveryComponent
  },
  {
    path: 'notFound', component:NotFoundComponent
  }
  // {
  //   path:'home', component:ProductsComponent
  // },
  // {
  //   path:'login',component:LoginComponent
  // },
  // {
  //   path:'register',component:RegisterComponent
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

