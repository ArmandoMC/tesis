import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(

  ) { }
  // saveToken(auth: Auth) {
  //   let currenSession=localStorage.getItem('session');
  //     if(currenSession){
  //       return false;
  //     }else{
  //       localStorage.setItem('session', JSON.stringify(auth));
  //       this.setCurrentUser(auth);
  //       return true;
  //     }

  // }
  getToken() {
    const token = localStorage.getItem('session');
    return token;
  }

  removeToken(){
    
  }
  // setCurrentUser(currentUser: Auth) {
  //   this.currentUserSubject.next(currentUser);
  // }
  // isValidtoken() {
  //   return !!localStorage.getItem('session');
  // }

  // saveSessionData(sessionData:Auth):Boolean{
  //   let currentSession=localStorage.getItem('session');
  //   if(currentSession){
  //     return false;
  //   }else{
  //     let data:
  //   }
  // }
}
