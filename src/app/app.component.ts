import { Component } from '@angular/core';
import { AuthencationService } from './core/auth/authencation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  show_header = true;
  title = 'paindIkaWeb';

  constructor(
    public auth: AuthencationService,
    public router: Router
  ){
    console.log('sdfsd => ', this.auth.isAuthenticated());
  }

  appliedData(){
    if(
      this.router.url !== '/admin/category-list'
      && this.router.url !== '/admin-login'
      && this.router.url !== '/admin/order-list'
      && this.router.url !== '/admin/user-list'
      && this.router.url !== '/admin/painting-list'
    ){
      return true
    }
    return false
  }
 
}
