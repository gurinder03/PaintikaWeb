import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { ApiService } from 'src/app/core/services/api.service';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signUpForm!: FormGroup;
  stateList = [];
  cityList = []

  constructor(
    private fb: FormBuilder,
    private auth: AuthencationService,
    public navCtrl: NavigationRouteService,
    public toast: ToastrService, 
    public api: ApiService
   ){
    this.formData();
  }

  ngOnInit(): void {
    this.getAllState();
  }

  formData(){
    this.signUpForm = this.fb.group({
      email_or_mobile_number: ['', [Validators.required, Validators.pattern(/^(?:\d{10}|\w+@\w+\.\w{2,4})$/)]],
      role: ['', [Validators.required]],
      userType: [true],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      state: [{ value: '', disabled: this.signUpForm?.value?.userType ? true : false }, [Validators.required]],
      city: [{ value: '', disabled: this.signUpForm?.value?.userType ? true : false }, [Validators.required]],
    });
  }

  getAllState(){
    this.api.stateList().then((res:any)=>{
      if (res && res.statusCode === 200) {
        this.stateList = res.data;
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    })
  }

  changeState(ele:any){
    let data = {
      state: ele.value
    }
    this.getCityList(data)
  }

  getCityList(data:any){
    this.api.getCitiesList(data).then((res:any)=>{
      if (res && res.statusCode === 200) {
        this.cityList = res.data;
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
        this.cityList = []
      } else {
        this.cityList = []
        this.toast.error('Something went wrong');
      }
    })
  }

  onSubmit() {
    if (this.signUpForm.value.userType == true) {
      this.signUpForm.patchValue({ role: 'ARTIST' });
      // @ts-expect-error
      this.signUpForm.get('state').enable();
       // @ts-expect-error
      this.signUpForm.get('city').enable();
    } else {
      this.signUpForm.patchValue({ role: 'USER' });
       // @ts-expect-error
      this.signUpForm.get('state').disable();
       // @ts-expect-error
      this.signUpForm.get('city').disable();
    }
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid) {
      this.auth.userSignIn(this.signUpForm.value)
    } else {
      this.toast.error('Form is not valid')
    }
  }
}
