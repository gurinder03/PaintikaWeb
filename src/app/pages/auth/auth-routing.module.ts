import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';

const routes: Routes = [
  {
    path: '',   
    children:[
      {
        path: 'login',
        component: LoginComponent
      },
      // {
      //   path: 'login/:auth',
      //   component: LoginComponent
      // },
      {
        path: 'sign-in',
        component: SignInComponent
      },
      {
        path: 'forgot',
        component: ForgotComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },
      {
        path: 'verify-otp/:data',
        component: VerifyOtpComponent
      }
    ]
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
