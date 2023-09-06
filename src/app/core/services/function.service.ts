import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { NavigationRouteService } from './navigation-route.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  cartCount:any
  getUserData:any = {}
  constructor(
    public navCtrl: NavigationRouteService
  ) { 
    let userData: any = localStorage.getItem('data')
    this.getUserData = JSON.parse(userData)
  }

  confirmBox(title= '', message = '', route:any = '', okBtn = '', cancelBtn = ''){
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: okBtn,
      cancelButtonText: cancelBtn
    }).then((result) => {
      if (result.value) {
        this.navCtrl.goTo(route)
        // Swal.fire(
        //   'Deleted!',
        //   'Your imaginary file has been deleted.',
        //   'success'
        // )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          '',
          'error'
        )
      }
    })
  }

 
}
