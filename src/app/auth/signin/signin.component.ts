import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../auth-models';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

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
      alert('Invalid form, please complete all required fields correctly!');
      return;
    }



    const model: AuthData = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.authService.loginUser(model);
  }

}
