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
  stateList = [];
  cityList = []
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
      this.getAllState()
  } 

  formData(){
    this.profileForm = this.fb.group({
      email_or_mobile_number: ['', [Validators.required, Validators.pattern(/^(?:\d{10}|\w+@\w+\.\w{2,4})$/)]],
      name: ['', [Validators.required]],
      surname: [''],
      dob: ['', [Validators.required]],
      address: [''],
      pending_balance: [{value: '', disabled: true}, Validators.required],
      gender: ['1', [Validators.required]],
      qualifications: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      professionalOrfreelancer: ['2', [Validators.required]],
      experience: [''],
      additional_detail: ['']
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

  
  changeState(ele:any){
    let data = {
      state: ele.value
    }
    this.getCityList(data)
  }

  pacthValue(data:any){
    this.profileForm.patchValue({ name: data.name });
    this.profileForm.patchValue({ email_or_mobile_number: data.email_or_mobile_number });
    this.profileForm.patchValue({ surname: data.surname });
    this.profileForm.patchValue({ dob: data.dob });
    this.profileForm.patchValue({ address: data.address });
    this.profileForm.patchValue({ pending_balance: data.pending_balance });
    this.profileForm.patchValue({ gender: data.gender });
    this.profileForm.patchValue({ qualifications: data.qualifications });
    this.profileForm.patchValue({ country: data.country });
    this.profileForm.patchValue({ state: data.state });
    this.profileForm.patchValue({ city: data.city });
    this.getCityList({ state: data.state })
    this.profileForm.patchValue({ professional: data.professional });
    this.profileForm.patchValue({ freelancer: data.freelancer });
    this.profileForm.patchValue({ experience: data.experience });
    this.profileForm.patchValue({ additional_detail: data.additional_detail });
    if(data && data.job_type == "professional"){
      this.profileForm.patchValue({professionalOrfreelancer: '1' })
    }else{
      this.profileForm.patchValue({professionalOrfreelancer: '2' })
      this.profileForm.patchValue({ experience:'' });
      this.profileForm.patchValue({ additional_detail: '' });
    }
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
    this.profileForm.value.dob = this.fun.transformDate(this.profileForm.value.dob, 'y-MM-dd');
    dataVal.append('dob', this.profileForm.value.dob);
    dataVal.append('address', this.profileForm.value.address ? this.profileForm.value.address : '');
    dataVal.append('gender', this.profileForm.value.gender);
    dataVal.append('qualifications', this.profileForm.value.qualifications);
    dataVal.append('country', this.profileForm.value.country);
    dataVal.append('state', this.profileForm.value.state);
    dataVal.append('city', this.profileForm.value.city);
    dataVal.append('id', this.auth.getUserData()._id); 
    
    if(this.profileForm.value && this.profileForm.value.professionalOrfreelancer == '1'){
      dataVal.append('job_type', 'professional'); 
      dataVal.append('experience', this.profileForm.value.experience);
      dataVal.append('additional_detail', this.profileForm.value.additional_detail ? this.profileForm.value.additional_detail: ''); 
    }else{
      dataVal.append('job_type', 'freelancer');
      dataVal.append('experience', '');
      dataVal.append('additional_detail', '');
      this.profileForm.patchValue({ experience:'' });
      this.profileForm.patchValue({ additional_detail: '' });
    }
    if(this.setImg && this.setImg.length){
      dataVal.append('image', this.setImg[0]);
    }
    this.profileForm.markAllAsTouched();
    if (this.profileForm.valid) {
      this.api.updateUserProfile(dataVal).then((res:any)=>{
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
