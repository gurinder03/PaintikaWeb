import { Component, OnInit } from '@angular/core';
import { AuthencationService } from './core/auth/authencation.service';
import { Router } from '@angular/router';
import { FunctionService } from './core/services/function.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  show_header = true;
  title = 'paindIkaWeb';

  constructor(
    public auth: AuthencationService,
    public router: Router,
    public fun: FunctionService
  ){  }

  ngOnInit(): void {
      this.fun.requestPermission();
      this.fun.listen()
  }

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
