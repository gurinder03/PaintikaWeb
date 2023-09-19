import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  fbUser: any
  constructor(
    private fb: FormBuilder,
    private auth: AuthencationService,
    private router: Router,
    private authService: SocialAuthService,
    public toast: ToastrService
   ){
    this.formData()
  }

  userTyppes = [
    {id: 1, role: "USER", name: 'User'},
    {id: 2, role: "ADMIN", name: 'Admin'},
    {id: 3, role: "ARTIST", name: 'Artist'}
  ]

  ngOnInit(): void {
    // this.authService.authState.subscribe((user)=>{
    //   this.fbUser = user
    //   debugger
    //   console.log("Login User = ", this.fbUser);
    // });
  }

  formData(){
    this.loginForm = this.fb.group({
      email_or_mobile_number: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['USER', [Validators.required]],
    });
  }

  onSubmit() {
    debugger
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
      console.log('res=> ', res);
      debugger
      this.fbUser = res
    }).catch((err:any)=>{
      this.toast.error(err)
    });
  }

  googleLogin(){
    console.log('Google Login');
  }
}
