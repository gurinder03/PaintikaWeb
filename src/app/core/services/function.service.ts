import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { NavigationRouteService } from './navigation-route.service';
import { DatePipe } from '@angular/common';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FunctionService {
  cartCount: any;
  navValue: any = '1';
  message:any = null;
  getAdminVal: boolean = false;
  getUserData: any = {};
  constructor(
    public navCtrl: NavigationRouteService,
    private datePipe: DatePipe
  ) {
    let userData: any = localStorage.getItem('data');
    this.getUserData = JSON.parse(userData);
  }

  confirmBox(
    title = '',
    message = '',
    route: any = '',
    okBtn = '',
    cancelBtn = ''
  ) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: okBtn,
        cancelButtonText: cancelBtn,
      }).then((result) => {
        if (result.value) {
          this.navCtrl.goTo(route);
          resolve(result);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', '', 'error');
          // reject(result.dismiss)
        }
      });
    });
  }

  transformDate(date: any, sequence = 'MMM dd, yyyy') {
    // MySql format - 'y-MM-dd'
    return this.datePipe.transform(date, sequence);
  }

  convert(str: any) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.vapidKey }).then((currentToken) => {
      if (currentToken) {
        console.log('Hurraaa!!! we got the token.....');
        console.log(currentToken);
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      debugger
      console.log('Message received. ', payload);
      this.message=payload;
    });
  }
}
