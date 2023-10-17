import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm!: FormGroup;
  new_password = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    this.passwordLengthValidator(6, 20)
  ]);
  confirm_password = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    this.passwordLengthValidator(6, 20)
  ]);
  constructor(
    public api: ApiService,
    public fb: FormBuilder,
    public toast: ToastrService,
    public auth: AuthencationService
  ){

  }

  ngOnInit(): void {
    this.formData()
  }

  formData(){
    this.passwordForm = this.fb.group({
      current_password: ['', [Validators.required, Validators.minLength(6)]],
      new_password: this.new_password,
      confirm_password: this.confirm_password,
      id: ['', [Validators.required]],
    }, {
      validator: this.ConfirmedValidator('new_password', 'confirm_password'),
    });
  }

  onSubmit(){
    console.log('this.passwordForm => ', this.passwordForm);
    
    this.passwordForm.markAsTouched()
    this.passwordForm.patchValue({id: this.auth.getUserData()._id})
    if(this.passwordForm.valid){
      this.api.userPassChange(this.passwordForm.value).then((res:any)=>{
        if(res && res.statusCode == 200){
          this.auth.logout();
          this.toast.success(res.message)
        }
        else{
          this.toast.error(res.message)
          this.passwordForm.reset()
        }
      })
    }else{
      this.toast.error('Form is not valid')
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
