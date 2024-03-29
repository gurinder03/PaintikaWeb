import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/core/services/admin-api.service';
import { FunctionService } from 'src/app/core/services/function.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  fbUser: any;
  // public user: SocialUser = new SocialUser;
  checkUserType: any;
  constructor(
    private fb: FormBuilder,
    private auth: AuthencationService,
    public fun: FunctionService,
    private router: Router,
    private authService: SocialAuthService,
    public adminApi: AdminApiService,
    public toast: ToastrService,
    public activatedRoute: ActivatedRoute
  ) {
    this.formData();
  }

  userTyppes = [
    { id: 1, role: 'USER', name: 'User' },
    { id: 2, role: 'ARTIST', name: 'Artist' },
  ];

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((queryParams) => {
      let params = queryParams.get('passcode');
      this.checkAdminLogin(params);
    });
  }

  ngAfterViewInit() {
    // if (this.fun.fbUserData) {
    //   this.signOut();
    // }
    this.authService.authState.subscribe((user) => {
      // console.log('Google fb Login', user);
      this.fun.fbUserData = user;
      if (this.fun.fbUserData && this.fun.fbUserData != null) {
        let data = {
          facebook_id: user.provider == 'FACEBOOK' ? user.id : '',
          google_id: user.provider == 'GOOGLE' ? user.id : '',
          authToken: user.idToken,
          email_or_mobile_number: user.email,
          name: user.name,
          role: 'USER',
          profile_image: user.photoUrl,
        };
        this.signOut();
        this.auth.socialLogin(data);
      }
    });
  }

  changeUserType(ele: any) {
    this.checkUserType = ele.value;
  }

  formData() {
    this.loginForm = this.fb.group({
      email_or_mobile_number: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?:\d{10}|\w+@\w+\.\w{2,4})$/),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['USER', [Validators.required]],
    });
  }

  checkAdminLogin(data: any) {
    this.adminApi.adminLogin(data).then((res: any) => {
      if (res && res.statusCode == 200) {
        if (res.data && res.data.isAdmin == true) {
          this.fun.getAdminVal = res.data.isAdmin;
        } else {
          this.router.navigate(['/auth/login']);
        }
      } else {
        this.toast.error(res.message);
      }
    });
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.fun.getAdminVal == true) {
      this.loginForm.patchValue({ role: 'ADMIN' });
    }
    if (this.loginForm.valid) {
      this.auth.userLogin(this.loginForm.value);
    } else {
      console.log('Form is not valid');
    }
  }

  goToSignUp() {
    this.router.navigate(['/auth/sign-in']);
  }

  public signOut(): void {
    this.authService.signOut();
  }

  facebookLogin() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res: any) => {
      this.fun.fbUserData = res;
    }).catch((err: any) => {
      console.log('Err ---', err);
      this.toast.error(err);
    });
  }

  // handleGoogleSignIn() {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res: any) => {
  //     console.log('Google Login', res);
  //   }).catch((err: any) => {
  //     console.log('Err => ', err);
  //     this.toast.error(err);
  //   });
  // }
}
