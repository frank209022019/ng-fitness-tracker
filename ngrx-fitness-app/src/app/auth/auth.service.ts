import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { UiService } from '../shared/ui.service';
import { TrainingService } from '../training/training.service';
import { AuthData } from './auth-models';
import * as fromApp from './../ngrx-store/app.reducer'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange = new Subject<boolean>();
  private isAuthenticated: boolean;

  constructor(private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<{ ui: fromApp.State }>) { }

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
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({ type: fromApp.APP_LOADING_STATE.START_LOADING });

    this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({ type: fromApp.APP_LOADING_STATE.STOP_LOADING });

      }).catch(err => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({ type: fromApp.APP_LOADING_STATE.STOP_LOADING });

        this.uiService.showSnackbar(err.message, null, 3000);
      })
  }

  loginUser(user: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({ type: fromApp.APP_LOADING_STATE.START_LOADING });
    this.afAuth.signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({ type: fromApp.APP_LOADING_STATE.STOP_LOADING });
      }).catch(err => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({ type: fromApp.APP_LOADING_STATE.STOP_LOADING });

        this.uiService.showSnackbar(err.message, null, 3000);
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
