import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { ApiService } from 'src/app/core/services/api.service';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
 
})
export class ProfileComponent implements OnInit {
  
  profileForm!: FormGroup;
  userData: any = {};
  selectedFile:any;
  constructor(
    private fb: FormBuilder,
    public navCtrl: NavigationRouteService,
    public toast: ToastrService,
    public api: ApiService,
    public auth: AuthencationService
  ){}

  ngOnInit(): void {
      this.formData()
      this.getUserProfile();
  } 

  formData(){
    this.profileForm = this.fb.group({
      email_or_mobile_number: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')]],
      name: ['', [Validators.required]],
      surname: [''],
      mobile_number: ['', [Validators.required, Validators.minLength(6)]],
      dob: ['', [Validators.required]],
      address: ['', [Validators.required]],
      gender: ['1', [Validators.required]],
      qualifications: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      professionalOrfreelancer: ['2', [Validators.required]],
      experience: ['', [Validators.required]],
      additional_detail: ['', [Validators.required]]
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
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any) => { 
        this.selectedFile = event.target.result;
      }
    }
  }

  onSubmit() {
    this.profileForm.markAllAsTouched();
    console.log('this.profileForm => ', this.profileForm);
    if (this.profileForm.valid) {
    } else {
      this.toast.error('Form is not valid')
    }
  }

  
}
