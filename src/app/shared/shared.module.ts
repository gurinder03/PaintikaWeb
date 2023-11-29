import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FacebookLoginProvider, 
  GoogleLoginProvider, 
  SocialAuthServiceConfig, 
  GoogleSigninButtonDirective,
  GoogleSigninButtonModule,
  SocialLoginModule
} from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment';
import { MatInputModule } from '@angular/material/input';

const CLIENT_ID = environment.client_Id;


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
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
export class SharedModule { }
