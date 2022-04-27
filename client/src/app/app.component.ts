import { Component, Output } from '@angular/core';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  imgParent = '';
  showImg=true;
 
  onLoaded(img:string){
    console.log('log padre', img);
  }

  toggleImg(){
    this.showImg=!this.showImg;
  }
}

