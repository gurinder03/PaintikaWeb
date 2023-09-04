import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthencationService } from 'src/app/core/auth/authencation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthencationService,
    private router: Router
   ){
    this.formData()
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
}
