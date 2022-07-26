import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import { AuthData } from '../auth-models';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  form: FormGroup;
  maxDate: Date;

  isLoading = false;
  private loadingSub: Subscription;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private uiService: UiService) { }

  ngOnInit() {
    this.loadingSub = this.uiService.loadingStateChanged.subscribe((res: boolean) => {
      this.isLoading = res;
    })

    this.setMaxDateForDatePicker();
    this.buildForm();
  }

  ngOnDestroy(): void {
    if (this.loadingSub) this.loadingSub.unsubscribe();
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get birthday() {
    return this.form.get('birthday');
  }

  get termsAndConditions() {
    return this.form.get('termsAndConditions');
  }

  setMaxDateForDatePicker() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      birthday: [null, [Validators.required]],
      termsAndConditions: [null, [Validators.required]]
    });
  }

  resetForm() {
    this.form.reset();
    this.form.updateValueAndValidity();
  }

  onFormSubmit() {
    debugger
    if (!this.form.valid) {
      this.uiService.showSnackbar('Invalid form, please complete all required fields correctly!', null, 3000);
      return;
    }

    const model: AuthData = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.authService.registerUser(model);
  }
}
