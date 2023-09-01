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
      email_or_mobile_number: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')]],
      role: ['USER', [Validators.required]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid) {
      console.log('this.signUpForm => ', this.signUpForm.value);
      this.auth.userSignIn(this.signUpForm.value)
    } else {
      this.toast.error('Form is not valid')
    }
  }
}
