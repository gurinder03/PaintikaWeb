import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { ApiService } from 'src/app/core/services/api.service';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.scss'],
})
export class DeliveryAddressComponent {
  addressForm!: FormGroup;
  addressAddUpdate: any = ''
  addressData:any
  constructor(
    public fb: FormBuilder,
    public api: ApiService,
    public auth: AuthencationService,
    public toast: ToastrService,
    public navCtrl: NavigationRouteService,
    public activatedRoute: ActivatedRoute
  ) {
    this.formData();
    this.activatedRoute.params.subscribe((event: any) => {
      if (event && event.id !== "addAddress") {
        this.addressAddUpdate = event.id;
        this.getSingleAddress(event?.id);
      }
    });
  }

  formData() {
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
      locality: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.addressForm.patchValue({user_id: this.auth.getUserData()._id})
    this.addressForm.markAllAsTouched();
    if (this.addressForm.valid) {
      let data = {
        user_id: this.auth.getUserData()._id,
        name: this.addressForm.value.name,
        address:{
          pinCode: this.addressForm.value.pincode, 
          locality: this.addressForm.value.locality,
          address: this.addressForm.value.address,
          landmark: this.addressForm.value.landmark,
          delveryType: this.addressForm.value.delveryType,
          allternatePhone: this.addressForm.value.allternatePhone,
          state: this.addressForm.value.state,
          city: this.addressForm.value.city,
          phoneNumber: this.addressForm.value.phoneNumber,
        },
        type: this.addressForm.value.delveryType,
        lat: this.addressForm.value.lat,
        lng: this.addressForm.value.lng
      }
      this.api.delveryAddress(data).then((res: any) => {
        if (res && res.statusCode === 200) {
          this.navCtrl.goTo('/page/add-to-cart');
          this.toast.success(res.message);
        } else if (res.statusCode === 500) {
          this.toast.error(res.message);
        } else {
          this.toast.error('Something went wrong');
        }
      });
    } else {
      this.toast.error('Form is not valid');
    }
  }

  setAddressValue(data:any){
    console.log('data => ', data);
    
    this.addressForm.patchValue({user_id: data.user_id})
    this.addressForm.patchValue({id: data._id})
    this.addressForm.patchValue({name: data.name})
    this.addressForm.patchValue({phoneNumber: data.address.phoneNumber})
    this.addressForm.patchValue({pincode: data.address.pinCode})
    this.addressForm.patchValue({locality: data.address.locality})
    this.addressForm.patchValue({address: data.address.address});
    this.addressForm.patchValue({city: data.address.city});
    this.addressForm.patchValue({state: data.address.state});
    this.addressForm.patchValue({landmark: data.address.landmark});
    this.addressForm.patchValue({delveryType: data.address.delveryType});
    this.addressForm.patchValue({allternatePhone: data.address.allternatePhone});
  }

  getSingleAddress(id: any) {
    debugger
    this.api.getAddress(id).then((res: any) => {
      if (res && res.statusCode === 200) {
        this.addressData = res.data
        this.setAddressValue(res.data);
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    });
  }
}
