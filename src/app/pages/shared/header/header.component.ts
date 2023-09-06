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

  setEl = 1
  constructor(
    public auth: AuthencationService,
    private router: Router,
    public fun: FunctionService
  ){
    
  }
  userLogout(){
    this.auth.logout()
  }

  navigateTo(route: string, ev:any) {
    this.setEl = ev;
    debugger
    console.log('this.setEl => ', this.setEl);
    
    this.router.navigate([route]);
  }
}
