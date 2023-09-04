import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ToastrService } from 'ngx-toastr';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
 
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  expForm: Array<FormGroup>= [];
  constructor(
    private fb: FormBuilder,
    public navCtrl: NavigationRouteService,
    public toast: ToastrService
  ){}

  ngOnInit(): void {
      this.formData()
      this.formData2()
  } 

  formData(){
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      mobile_number: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', [Validators.required]],
      address: ['', [Validators.required]],
      male: ['', [Validators.required]],
      female: ['', [Validators.required]],
      qualification: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      professional: ['', [Validators.required]],
      freelancer: ['', [Validators.required]]
    });
  }


  formData2(){
    this.expForm.push(
      this.fb.group({
        additional_detail: ['', []],
        experience: ['', []]
      })
    )
  }

  addExp() {
    this.formData2();
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
