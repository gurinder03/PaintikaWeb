import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { ApiService } from 'src/app/core/services/api.service';
import { FunctionService } from 'src/app/core/services/function.service';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
 
})
export class ProfileComponent implements OnInit {
  
  profileForm!: FormGroup;
  userData: any = {};
  setImg: any;
  selectedFile:any;
  constructor(
    private fb: FormBuilder,
    public navCtrl: NavigationRouteService,
    public toast: ToastrService,
    public api: ApiService,
    public fun: FunctionService,
    public auth: AuthencationService
  ){}

  ngOnInit(): void {
      this.formData()
      this.getUserProfile();
  } 

  formData(){
    this.profileForm = this.fb.group({
      email_or_mobile_number: ['', [Validators.required, Validators.pattern(/^(?:\d{10}|\w+@\w+\.\w{2,4})$/)]],
      name: ['', [Validators.required]],
      surname: [''],
      mobile_number: ['', [Validators.required, Validators.minLength(6)]],
      dob: ['', [Validators.required]],
      address: [''],
      gender: ['1', [Validators.required]],
      qualifications: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      professionalOrfreelancer: ['2', [Validators.required]],
      experience: [''],
      additional_detail: ['']
    });
  }

  pacthValue(data:any){
    this.profileForm.patchValue({ name: data.name });
    this.profileForm.patchValue({ email_or_mobile_number: data.email_or_mobile_number });
    this.profileForm.patchValue({ surname: data.surname });
    this.profileForm.patchValue({ mobile_number: data.mobile_number });
    this.profileForm.patchValue({ dob: data.dob });
    this.profileForm.patchValue({ address: data.address });
    this.profileForm.patchValue({ gender: data.gender });
    this.profileForm.patchValue({ qualifications: data.qualifications });
    this.profileForm.patchValue({ country: data.country });
    this.profileForm.patchValue({ state: data.state });
    this.profileForm.patchValue({ professional: data.professional });
    this.profileForm.patchValue({ freelancer: data.freelancer });
    this.profileForm.patchValue({ experience: data.experience });
    this.profileForm.patchValue({ additional_detail: data.additional_detail });
  }

  getUserProfile(){    
    this.api.getSingleUser(this.auth.getUserData()._id).then((res:any)=>{
      if (res && res.statusCode === 200) {
        this.userData = res.data;
        this.selectedFile = res.data.profile_image
        this.pacthValue(res.data);
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    })
  }

  onFileSelect(event:any) {
    if (event.target.files && event.target.files[0]) {
      this.setImg = event.target.files
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any) => { 
        this.selectedFile = event.target.result;
      }
    }
  }

  onSubmit() {
    let dataVal = new FormData();
    dataVal.append('email_or_mobile_number', this.profileForm.value.email_or_mobile_number);
    dataVal.append('name', this.profileForm.value.name);
    dataVal.append('surname', this.profileForm.value.surname ? this.profileForm.value.surname : '');
    dataVal.append('mobile_number', this.profileForm.value.mobile_number);
    this.profileForm.value.dob = this.fun.transformDate(this.profileForm.value.dob, 'y-MM-dd');
    dataVal.append('dob', this.profileForm.value.dob);
    dataVal.append('address', this.profileForm.value.address ? this.profileForm.value.address : '');
    dataVal.append('gender', this.profileForm.value.gender);
    dataVal.append('qualifications', this.profileForm.value.qualifications);
    dataVal.append('country', this.profileForm.value.country);
    dataVal.append('state', this.profileForm.value.state);
    dataVal.append('experience', this.profileForm.value.experience);
    dataVal.append('additional_detail', this.profileForm.value.additional_detail ? this.profileForm.value.additional_detail: ''); 
    dataVal.append('id', this.auth.getUserData()._id); 
    if(this.setImg && this.setImg.length){
      dataVal.append('image', this.setImg[0]);
    }
    this.profileForm.markAllAsTouched();
    console.log('this.profileForm => ', this.profileForm);
    if (this.profileForm.valid) {
      this.api.updateUserProfile(dataVal).then((res:any)=>{
        console.log('res => ', res);
        if (res && res.statusCode === 200) {
          this.toast.success(res.message)
        } else if (res.statusCode === 500) {
          this.toast.error(res.message);
        } else {
          this.toast.error('Something went wrong');
        }
      })
    } else {
      this.toast.error('Form is not valid')
    }
  }

  
}
