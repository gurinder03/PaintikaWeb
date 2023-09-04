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
  
  resendOtpPass(data: any) {
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value);
        }
        else {
          reject(value.statusText);
          this.toast.error(value.statusText);
        }
      };
      this.request.send('reSendOtp', data, success, null, true);
    });
  }

  userSignIn(data:any) {
    const success = (value:any) => {
      if (value && value.statusCode == 200) {
        let data = {
          email_or_mobile_number: value.data.email_or_mobile_number,
          role: value.data.role,
          isUserSined: 'SignUp'
        }
        this.navCtrl.goTo(`/auth/verify-otp/${JSON.stringify(data)}`, {}, 'root')
        this.toast.success(value.message)
      }else{
        this.toast.error(value.message)
      }
    };
    this.request.send('userSignup', data, success, null, true);
  }

  verifyOtp(data:any) {
    return new Promise((resolve, reject) => { 
      const success = (value:any) => {
        if (value && value.statusCode == 200) {
          resolve(value)
          this.toast.success(value.message)
        }else{
          resolve(false)
          this.toast.error(value.message)
        }
      };
      this.request.send('otpVerify', data, success, null, true);
    });
  }

  passwordReset(data:any) {
    const success = (value:any) => {
      debugger
      if (value && value.statusCode == 200) {
        this.navCtrl.goTo('/auth/login', {}, 'root')
        this.toast.success(value.message)
      }else{
        this.toast.error(value.message)
      }
    };
    this.request.send('resetPassword', data, success, null, true);
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
    this.navCtrl.goTo('/page/dashboard', {}, 'root');
  }

  getToken(): Promise<string> {
    // @ts-expect-error
    return Promise.resolve(localStorage.getItem('token'));
  }
}
