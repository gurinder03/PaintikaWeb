import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { GoogleLoginProvider, SocialAuthService } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/core/services/admin-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  adminValue:any
  fbUser: any
  constructor(
    private fb: FormBuilder,
    private auth: AuthencationService,
    private router: Router,
    private authService: SocialAuthService,
    public adminApi: AdminApiService,
    public toast: ToastrService,
    public activatedRoute: ActivatedRoute
   ){
    this.formData()
  }

  userTyppes = [
    {id: 1, role: "USER", name: 'User'},
    {id: 2, role: "ARTIST", name: 'Artist'},
  ]

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((queryParams) => {
      let params = queryParams.get('passcode');
      this.checkAdminLogin(params)
    });
  }

  formData(){
    this.loginForm = this.fb.group({
      email_or_mobile_number: ['', [Validators.required, Validators.pattern(/^(?:\d{10}|\w+@\w+\.\w{2,4})$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['USER', [Validators.required]],
    });
  }

  checkAdminLogin(data:any){
    this.adminApi.adminLogin(data).then((res:any) =>{
      if(res && res.statusCode == 200){
        if(res.data && res.data.isAdmin == true){
          this.adminValue = res.data.isAdmin
          this.loginForm.patchValue({role: "ADMIN"})
        }else{
          this.router.navigate(['/auth/login'])
        }
      }
      else{
        this.toast.error(res.message)
      }
    })    
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.auth.userLogin(this.loginForm.value) 
    } else {
      console.log('Form is not valid');
    }    
  }

  goToSignUp(){
    this.router.navigate(['/auth/sign-in'])
  }

  facebookLogin(){
    console.log('FB Login');
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res:any)=>{
      if(res){
        let data = {
          "facebook_id": res.response.id,
          "google_id":"",
          "authToken": res.authToken,
          "email_or_mobile_number": res.response.email,
          "name":  res.response.name,
          "role": 'USER',
          "profile_image": res.response.picture.data.url
        }
        // this.auth.socialLogin(data)
      }
      this.fbUser = res
    }).catch((err:any)=>{
      this.toast.error(err)
    });
  }

  googleLogin(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res:any) => {
      console.log('Google Login', res);
    }).catch((err:any)=>{
      this.toast.error(err)
    });;
  }
}
