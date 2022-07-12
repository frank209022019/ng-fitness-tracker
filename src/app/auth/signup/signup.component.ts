import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthData } from '../auth-models';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  maxDate: Date;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.setMaxDateForDatePicker();
    this.buildForm();
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
    if (!this.form.valid) {
      alert('Invalid form, please complete all required fields correctly!');
      return;
    }

    const model: AuthData = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.authService.registerUser(model);
  }
}
