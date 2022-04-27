import { Component } from '@angular/core';
import { Router } from '@angular/router';
import{Customer,CreateCustomerDTO} from '../../models/customer.model';
import {CustomerService} from '../../services/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name:string;
  lastName:string;
  phone:string;
  email:string;
  password:string;
  repeatPassword:string;

  constructor(
    private customerService:CustomerService,
    private router:Router
  ) { }



  createCustomer(){

    const customer:CreateCustomerDTO={
       name:this.name,
       lastName:this.lastName,
       phone:this.phone,
       user:{
         email:this.email,
         password:this.password
       }
    }
    this.customerService.create(customer)
    .subscribe(data=>{
    console.log( data);
    this.router.navigate(['/login']);

    },err=>console.log(err))


  }

}
