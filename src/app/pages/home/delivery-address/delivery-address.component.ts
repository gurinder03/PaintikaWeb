import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { ApiService } from 'src/app/core/services/api.service';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.scss']
})
export class DeliveryAddressComponent {

  addressForm!: FormGroup;
  constructor(
    public fb: FormBuilder,
    public api: ApiService,
    public auth: AuthencationService,
    public toast: ToastrService,
    public navCtrl: NavigationRouteService
  ){
    this.formData()
  }

  formData(){
    this.addressForm = this.fb.group({
      user_id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      lat: ['44.00155'],
      lng: ['75.20524'],
      landmark: [''],
      phoneNumber: ['', [Validators.required]],
      city: [''],
      state: ['', [Validators.required]],
      allternatePhone: [''],
      delveryType: ['', [Validators.required]],
      pincode: ['', [Validators.required]], 
      locality: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.addressForm.patchValue({ user_id: this.auth.getUserData()._id });
    this.addressForm.markAllAsTouched();
    console.log('this.addressForm => ', this.addressForm);
    if (this.addressForm.valid) {
      this.api.delveryAddress(this.addressForm.value).then((res:any)=>{
        console.log('res => ', res);
        if (res && res.statusCode === 200) {
          this.navCtrl.goTo('/page/add-to-cart')
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
