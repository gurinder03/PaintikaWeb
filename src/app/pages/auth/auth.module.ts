import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotComponent } from './forgot/forgot.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';
import { 
  FacebookLoginProvider, 
  GoogleLoginProvider, 
  SocialAuthServiceConfig, 
  SocialLoginModule
} from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    ForgotComponent,
    LoginComponent,
    SignInComponent,
    ResetPasswordComponent,
    VerifyOtpComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    SocialLoginModule,
    MatInputModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          // {
          //   id: GoogleLoginProvider.PROVIDER_ID,
            
          //   provider: new GoogleLoginProvider('654230831370-a114u4r22ehgpfrods4irbj91eoerq9a.apps.googleusercontent.com',
          //   {
          //    // scopes : environment.auth.scopes,
          //     prompt : 'none'   // '' | 'none' | 'consent' |  'select_account'
          //   }),

          // },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('320674645067714')
          }
        ],
        onError: (err) => {
          console.error('Auth Error => ', err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  
})
export class AuthModule { }
