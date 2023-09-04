import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { NavigationRouteService } from './navigation-route.service';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  constructor(
    public navCtrl: NavigationRouteService
  ) { }

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
