import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TrainingService } from '../training/training.service';
import { AuthData, AuthUser } from './auth-models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange = new Subject<boolean>();
  private isAuthenticated: boolean;

  constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService) { }

  initAuthListener(){
    //  Check for the current auth state of FireStore Auth
    this.afAuth.authState.subscribe(res => {
      if(res){
        this.isAuthenticated = true;
        this.authChange.next(this.isAuthenticated);
        this.router.navigate(['training']);
      } else{
        this.isAuthenticated = false;
        this.authChange.next(this.isAuthenticated);
        this.trainingService.cancelSubscriptions();
        this.router.navigate(['signin']);
      }
    })
  }

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
    }).catch(err => {
      alert(err)
    })
  }

  logoutUser() {
      this.afAuth.signOut();
  }

  getUser() {
    //  object spread - returns the private object, but prevents manipulating the private object in the service
    if(this.isAuthenticated){
      return this.afAuth.currentUser;
    }
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
