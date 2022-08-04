import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import { AuthData } from '../auth-models';
import { AuthService } from '../auth.service';
import * as fromApp from './../../ngrx-store/app.reducer'
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{

  form: FormGroup;
  maxDate: Date;

  isLoading = false;
  isLoading$: Observable<boolean>;

  private loadingSub: Subscription;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private uiService: UiService,
    private store: Store<{ ui: fromApp.State }>)
    { }

  ngOnInit() {
    this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));

    // this.loadingSub = this.uiService.loadingStateChanged.subscribe((res: boolean) => {
    //   this.isLoading = res;
    // })

    this.setMaxDateForDatePicker();
    this.buildForm();
  }

  // ngOnDestroy(): void {
  //   if(this.loadingSub) this.loadingSub.unsubscribe();
  // }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  setMaxDateForDatePicker() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  resetForm() {
    this.form.reset();
    this.form.updateValueAndValidity();
  }

  onFormSubmit() {
    if (!this.form.valid) {
      this.uiService.showSnackbar('Invalid form, please complete all required fields correctly!', null, 3000);
      return;
    }

    const model: AuthData = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.authService.loginUser(model);
  }

}
