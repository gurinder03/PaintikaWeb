import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
  GoogleSigninButtonDirective,
  GoogleSigninButtonModule,
  SocialLoginModule
} from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment';

const CLIENT_ID = environment.client_Id;

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
    MatInputModule,
    GoogleSigninButtonModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(CLIENT_ID)
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('320674645067714')
          }
        ],
        onError: (err) => {
          console.error('Auth Error => ', err);
        }
      } as SocialAuthServiceConfig,
    },
    GoogleSigninButtonDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class AuthModule { }
