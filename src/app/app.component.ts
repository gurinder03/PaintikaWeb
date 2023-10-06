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
  ){  }

  appliedData(){
    if(
      this.auth 
      && this.auth?.getUserData()?.role !== 'ADMIN'
    ){
      return true
    }
    return false
  }
 
}
