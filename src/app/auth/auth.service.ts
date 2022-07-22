import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData, AuthUser } from './auth-models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser?: AuthUser;
  authChange = new Subject<boolean>();

  constructor(private router: Router, private afAuth: AngularFireAuth) { }

  registerUser(user: AuthData) {
    this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
    .then(res => {
      // this.authSuccessfully();
    }).catch(err => {
      alert(err.error)
    })
  }

  loginUser(user: AuthData) {
    this.afAuth.signInWithEmailAndPassword(user.email, user.password)
    .then(res => {
      this.authSuccessfully(user, res);
    }).catch(err => {
      alert(err.error)
    })
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

  authSuccessfully(user: AuthData, authResult: any) {
    debugger
    const authUser: AuthUser = { email: user.email, userId: authResult.user.uid, refreshToken: authResult.user.refreshToken };
    this.currentUser = authUser;
    this.authChange.next(true);
    this.router.navigate(['training']);
  }
}
