import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { FunctionService } from 'src/app/core/services/function.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  userData: any = {}
  constructor(
    public auth: AuthencationService,
    private router: Router,
    public fun: FunctionService,
    public toast: ToastrService
  ){
    this.userData = this.auth.getUserData();
    this.fun.navValue = localStorage.getItem('activeNav');
  }
  userLogout(){
    this.auth.logout();
    this.toast.success('Logout Sccessfully')
  }

  navigateTo(route: string, ev:any) {
    localStorage.setItem('activeNav', ev)
    this.fun.navValue = ev;
    this.router.navigate([route]);
    if(ev === '7'){
      this.auth.logout()
      this.router.navigate([route]);
    }
    if(ev == '5'){
      this.fun.getAdminVal = false
    }
  }
}
