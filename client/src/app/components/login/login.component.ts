import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/models/auth.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  token='';
  usuario:User | null=null;
  profile:User | null=null;

  // @Output() logueado=new EventEmitter<User>();
  constructor(
    private router:Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.email, this.password)
    .subscribe(user=>{

      this.usuario=user.user;
      console.log(user);
      // this.logueado.emit();
      this.router.navigate(['']);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Ingreso exitoso',
        showConfirmButton: false,
        timer: 1500
      })

    },err=>{console.error('hubo un error al hacer login')});
  }

  // getProfile(){
  //   this.authService.getProfile()
  //   .subscribe(
  //     profile=>{
  //         console.log('usuario logueado: ' ,profile);
  //     },
  //     err=>console.log('Hubo un errorerr' , err)
  //   )
  // }

  // loginAndGet(){

  // }
}
