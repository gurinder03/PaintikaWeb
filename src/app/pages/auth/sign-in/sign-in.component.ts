import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  signUpForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthencationService,
    public navCtrl: NavigationRouteService,
    public toast: ToastrService
   ){
    this.formData()
  }

  formData(){
    this.signUpForm = this.fb.group({
      email_or_mobile_number: ['', [Validators.required, Validators.pattern(/^(?:\d{10}|\w+@\w+\.\w{2,4})$/)]],
      role: ['', [Validators.required]],
      userType: [true],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if(this.signUpForm && this.signUpForm.value && this.signUpForm.value.userType == true){
      this.signUpForm.patchValue({role: 'ARTIST'})
    } else{
      this.signUpForm.patchValue({role: 'USER'})
    }
    console.log(this.signUpForm );
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid) {
      this.auth.userSignIn(this.signUpForm.value)
    } else {
      this.toast.error('Form is not valid')
    }
  }
}
