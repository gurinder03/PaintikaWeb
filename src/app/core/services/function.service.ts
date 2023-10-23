import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { NavigationRouteService } from './navigation-route.service';
import { ApiService } from './api.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  cartCount:any;
  getAdminVal: boolean = false
  getUserData:any = {}
  constructor(
    public navCtrl: NavigationRouteService,
    private datePipe: DatePipe,
  ) { 
    let userData: any = localStorage.getItem('data')
    this.getUserData = JSON.parse(userData)
  }

  confirmBox(title= '', message = '', route:any = '', okBtn = '', cancelBtn = ''){
    return new Promise((resolve, reject) => {
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
          resolve(result)
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled',  '',  'error')
          // reject(result.dismiss)
        }
      })
    });
    
  }

  transformDate(date:any, sequence = 'MMM dd, yyyy') {
    // MySql format - 'y-MM-dd'
    return this.datePipe.transform(date, sequence);
  }
 
  convert(str:any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
}
