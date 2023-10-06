import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
})
export class VerifyOtpComponent implements OnInit {
  verifyForm!: FormGroup;
  navData: any;
  constructor(
    private fb: FormBuilder,
    private auth: AuthencationService,
    public navCtrl: NavigationRouteService,
    public toast: ToastrService,
    public activatedRoute: ActivatedRoute
  ) {
    this.formData();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((event:any) => {
      if(event){
        this.navData = JSON.parse(event.data);
      }
    });
  }

  formData() {
    this.verifyForm = this.fb.group({
      email_or_mobile_number: ['', [Validators.required, Validators.pattern(/^(?:\d{10}|\w+@\w+\.\w{2,4})$/)]],
      role: ['', [Validators.required]],
      OTP: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.verifyForm.patchValue({ email_or_mobile_number: this.navData.email_or_mobile_number});
    this.verifyForm.patchValue({ role: this.navData.role });
    this.verifyForm.markAllAsTouched();
    if (this.verifyForm.valid) {
      this.auth.verifyOtp(this.verifyForm.value).then((res:any) => {
        if (res && res.statusCode === 200) {
          if(this.navData && this.navData.isUserSined == "SignUp"){
            this.navCtrl.goTo('/auth/login')
          }else{
            this.navCtrl.goTo('/auth/reset-password', res.data, 'root')
          }
        }
        else if(res.statusCode === 500){
          this.toast.error(res.message);
        } else {
          console.log('Something went wrong', res);
        }
      });
    } else {
      this.toast.error('Form is not valid');
    }
  }

  resendOtp() {
    this.auth.resendOtpPass(this.navData).then((res: any) => {
      if (res && res.statusCode === 200) {
        this.navData = res.data;
        this.toast.success(res.message);
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    });
  }

  back(){
    if(this.navData && this.navData.isUserSined == "SignUp"){
      this.navCtrl.goTo('/auth/sign-in')
    }else{
      this.navCtrl.goTo('/auth/forgot')
    }
  }
}
