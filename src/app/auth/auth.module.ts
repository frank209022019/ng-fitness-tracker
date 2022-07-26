import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { SharedModule } from "../shared/shared.module";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
  ],
  imports: [
    SharedModule,
    AngularFireAuthModule
  ],
  exports: [

  ]
})

export class AuthModule { }
