import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { switchMap, tap } from 'rxjs/operators';

import { TokenService } from './token.service';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:3000/api/auth';

  constructor(
    private http: HttpClient,
    private storeService: StoreService
  ) {
    this.verifycurrentSession();
  }

  verifycurrentSession() {
    let currentsession = this.getSessionData();
    if (currentsession) {
      this.storeService.setCurrentUser(JSON.parse(currentsession));
    }
  }

  getSessionData() {
    let currentSession = localStorage.getItem('session');
    return currentSession;
  }
  saveToken(auth: Auth) {
    auth.user.isLoggedIn = false;
    let currenSession = localStorage.getItem('session');
    if (currenSession) {
      return false;
    } else {
      auth.user.isLoggedIn = true;
      localStorage.setItem('session', JSON.stringify(auth));
      this.storeService.setCurrentUser(auth);
      return true;
    }
  }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.API_URL}/login`, { email, password })
      .pipe(
        tap(response => this.saveToken(response))

      );


  }

  logout(){
    localStorage.removeItem('session');
    this.storeService.setCurrentUser({user:{},token:''} as  Auth);
  }
  loginAndGet(email: string, password: string) {
    return this.login(email, password)
      .pipe(
        switchMap(() => this.getProfile())
      )

  }
  getProfile() {
    return this.http.get<User>(`${this.API_URL}/ver-perfil`)

  };

}



  // logout(){
  //   localStorage.removeItem('session');
  // }
  // isValidtoken() {
  //   return !!localStorage.getItem('session');
  // }

  // isLoggedIn():Observable<boolean>{
  //   return this.isLoginSubject.asObservable();
  // }





