import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {
  forgotPassForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthencationService,
    public navCtrl: NavigationRouteService,
    public toast: ToastrService
   ){
    this.formData()
  }

  formData(){
    this.forgotPassForm = this.fb.group({
      email_or_mobile_number: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')]],
      role: ['USER', [Validators.required]],
    });
  }
  
  onSubmit() {
    this.forgotPassForm.markAllAsTouched();
    if (this.forgotPassForm.valid) {
      this.auth.sendOptForgotPasswrd(this.forgotPassForm.value).then((res:any) => {
        if (res && res.statusCode === 200) {
          this.toast.success(res.message)
          this.navCtrl.goTo(`/auth/verify-otp/${JSON.stringify(res.data)}`, {}, 'root');
          // this.forgotPassForm.reset()
        }
        else if(res.statusCode === 500){
          this.toast.error(res.message);
          // this.forgotPassForm.reset()
        } else {
          this.toast.error('Something went wrong');
          // this.forgotPassForm.reset()
        }
      });
    } else {
      console.log('this.loginForm => ', this.forgotPassForm.value);
      console.log('Form is not valid');
    }
  }

}
