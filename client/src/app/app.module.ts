import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.routing';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomerService } from './services/customer.service';
import { TimeInterceptor } from './interceptors/time.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { StoreService } from './services/store.service';
import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import {SwiperModule} from 'swiper/angular';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CategoryComponent } from './pages/category/category.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    NotFoundComponent,
    CategoryComponent,
    MyCartComponent,
    RecoveryComponent,
    ProfileComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    SwiperModule
  ],
  providers: [AuthService, CustomerService,StoreService,
    {provide: HTTP_INTERCEPTORS, useClass: TimeInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
