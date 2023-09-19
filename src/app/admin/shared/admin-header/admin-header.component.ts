import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthencationService } from 'src/app/core/auth/authencation.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {
  setEl = 3

  constructor(
    public router: Router,
    public auth: AuthencationService,
    
  ){}

  userLogout(){
    this.auth.logout()
  }

  navigateTo(route: string, ev:any) {
    this.setEl = ev;
    this.router.navigate([route]);
  }
 
}
