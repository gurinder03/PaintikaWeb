import { Component } from '@angular/core';
import { AuthencationService } from './core/auth/authencation.service';
import { Router } from '@angular/router';
import { FunctionService } from './core/services/function.service';

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
    public router: Router,
    public fun: FunctionService
  ){
    console.log('sdfsd => ', this.auth.isAuthenticated());
  }

  appliedData(){
    if(
      this.router.url !== '/admin/category-list'
      && this.router.url !== '/admin/order-list'
      && this.router.url !== '/admin/user-list'
      && this.router.url !== '/admin/painting-list'
      && this.router.url !== '/admin/add-category'
    ){
      return true
    }
    return false
  }
 
}
