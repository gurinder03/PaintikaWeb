import { Injectable } from '@angular/core';
import { RequestService } from '../utility/handler/request.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { NavigationRouteService } from '../services/navigation-route.service';

const HAS_LOGGED_IN: any = 'hasLoggedIn';

@Injectable({
  providedIn: 'root'
})
export class AuthencationService {

  authState = new BehaviorSubject(false);
  constructor(
    private request: RequestService,
    private toast: ToastrService,
    public navCtrl: NavigationRouteService
  ) { }

  userLogin(data:any) {
    const success = (value:any) => {
      if (value && value.statusCode == 200) {
        this.setLoggedIn(value.data.token, value.data)
        this.toast.success(value.message)
      }else{
        this.toast.error(value.message)
      }
    };
    this.request.send('login', data, success, null, true);
  }

  sendOptForgotPasswrd(data: any) {
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        console.log('value => ', value);
        if (value) {
          resolve(value);
        }
        else {
          reject(value.statusText);
          this.toast.error(value.statusText);
        }
      };
      this.request.send('sendOtp', data, success, null, true);
    });
  }

  userSignIn(data:any) {
    const success = (value:any) => {
      if (value && value.statusCode == 200) {
        this.navCtrl.goTo('/auth/verify-otp', {}, 'root')
        this.toast.success(value.message)
      }else{
        this.toast.error(value.message)
      }
    };
    this.request.send('userSignup', data, success, null, true);
  }


  setLoggedIn(token = '', userData:any) {
    return new Promise((resolve) => {
      localStorage.setItem('token', token);
      localStorage.setItem('data', JSON.stringify(userData))
      localStorage.setItem(HAS_LOGGED_IN, 'true');
      this.navCtrl.goTo('/page/dashboard', {}, 'root')
      this.authState.next(true);
      resolve(true);
    });
  }

  isAuthenticated() {
    const accessToken = localStorage.getItem('token');
    const user = localStorage.getItem('data');
    if (accessToken && user) {
      return true;
    }
    return false;
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem(HAS_LOGGED_IN);
    this.authState.next(false);
    this.navCtrl.goTo('/auth/login', {}, 'root');
  }

  getToken(): Promise<string> {
    // @ts-expect-error
    return Promise.resolve(localStorage.getItem('token'));
  }
}
