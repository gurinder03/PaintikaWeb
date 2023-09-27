import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetPassForm!: FormGroup;
  data:any
  password = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    this.passwordLengthValidator(6, 20)
  ]);
  confirmPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    this.passwordLengthValidator(6, 20)
  ]);


  constructor(
    private fb: FormBuilder,
    private auth: AuthencationService,
    public navCtrl: NavigationRouteService,
    public toast: ToastrService
   ){
    this.data = this.navCtrl.navtigationData
    this.formData()
  }


  formData(){
    this.resetPassForm = this.fb.group({
      password: this.password,
      confirmPassword: this.confirmPassword,
      email_or_mobile_number: ['',  [Validators.required]],
      OTP: ['',  [Validators.required]],
      role: ['', [Validators.required]],
    }, {
      validator: this.ConfirmedValidator('password', 'confirmPassword'),
    }
    );
  }

  onSubmit() {
    this.resetPassForm.patchValue({ email_or_mobile_number: this.data?.email_or_mobile_number});
    this.resetPassForm.patchValue({ OTP: this.data?.OTP });
    this.resetPassForm.patchValue({ role: this.data?.role });
    console.log('this.loginForm => ', this.resetPassForm, this.data);
    this.resetPassForm.markAllAsTouched();
    if (this.resetPassForm.valid) {
      this.auth.passwordReset(this.resetPassForm.value)
    } else {
      this.toast.error('Form is not valid');
    }
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  passwordLengthValidator(minLength: number, maxLength: number) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.value;
      if (password && (password.length < minLength || password.length > maxLength)) {
        return { 'passwordLength': true };
      }
      return null;
    };
  }

}
