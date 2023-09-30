import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { FunctionService } from 'src/app/core/services/function.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  setEl = 1;
  userData: any = {}
  constructor(
    public auth: AuthencationService,
    private router: Router,
    public fun: FunctionService
  ){
    this.userData = this.auth.getUserData()
  }
  userLogout(){
    this.auth.logout()
  }

  navigateTo(route: string, ev:any) {
    this.setEl = ev;
    this.router.navigate([route]);
    if(ev === 7){
      this.auth.logout()
      this.router.navigate([route]);
    }
  }
}
