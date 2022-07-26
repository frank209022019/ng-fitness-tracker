import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UiService } from '../shared/ui.service';
import { TrainingService } from '../training/training.service';
import { AuthData } from './auth-models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange = new Subject<boolean>();
  private isAuthenticated: boolean;

  constructor(private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private snackbar: MatSnackBar,
    private uiService: UiService) { }

  initAuthListener() {
    //  Check for the current auth state of FireStore Auth
    this.afAuth.authState.subscribe(res => {
      if (res) {
        this.isAuthenticated = true;
        this.authChange.next(this.isAuthenticated);
        this.router.navigate(['training']);
      } else {
        this.isAuthenticated = false;
        this.authChange.next(this.isAuthenticated);
        this.trainingService.cancelSubscriptions();
        this.router.navigate(['signin']);
      }
    })
  }

  registerUser(user: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        this.uiService.loadingStateChanged.next(false);
      }).catch(err => {
        this.uiService.loadingStateChanged.next(false);
        this.snackbar.open(err.message, null, { duration: 3000 });
      })
  }

  loginUser(user: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        this.uiService.loadingStateChanged.next(false);
      }).catch(err => {
        this.snackbar.open(err.message, null, { duration: 3000 });
        this.uiService.loadingStateChanged.next(false);
      })
  }

  logoutUser() {
    this.afAuth.signOut();
  }

  getUser() {
    //  object spread - returns the private object, but prevents manipulating the private object in the service
    if (this.isAuthenticated) {
      return this.afAuth.currentUser;
    }
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
