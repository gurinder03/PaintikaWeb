import { Component } from '@angular/core';
import { AuthencationService } from 'src/app/core/auth/authencation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    public auth: AuthencationService
  ){
    
  }
  userLogout(){
    this.auth.logout()
  }
}
