import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData, AuthUser } from './auth-models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser?: AuthUser;
  authChange = new Subject<boolean>();

  constructor(private router: Router) { }

  registerUser(user: AuthData) {
    this.currentUser = {
      email: user.email,
      userId: Math.round(Math.random() * 10000).toString()
    }
    this.authSuccessfully();
  }

  loginUser(user: AuthData) {
    this.currentUser = {
      email: user.email,
      userId: Math.round(Math.random() * 10000).toString()
    }
    this.authSuccessfully();
  }

  logoutUser() {
    this.currentUser = undefined;
    this.authChange.next(false);
    this.router.navigate(['signin']);
  }

  getUser() {
    //  object spread - returns the private object, but prevents manipulating the private object in the service
    return { ...this.currentUser };
  }

  isAuth() {
    return this.currentUser !== undefined && this.currentUser !== null;
  }

  authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['training']);
  }
}
