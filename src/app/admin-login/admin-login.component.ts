import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthencationService } from '../core/auth/authencation.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  adminLoginForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    public auth: AuthencationService
  ){
    this.formData()
  }

  formData(){
    this.adminLoginForm = this.fb.group({
      email_or_mobile_number: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['ADMIN', [Validators.required]],
    });
  }

  onSubmit() {
    debugger
    this.adminLoginForm.markAllAsTouched();
    if (this.adminLoginForm.valid) {
      this.auth.userLogin(this.adminLoginForm.value)
    } else {
      console.log('Form is not valid');
    }
  }
}
