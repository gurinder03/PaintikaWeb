import { Component } from '@angular/core';
import { AuthencationService } from './core/auth/authencation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  show_header = true;
  title = 'paindIkaWeb';

  constructor(
    public auth: AuthencationService
  ){
    console.log('sdfsd => ', this.auth.isAuthenticated());
   }
}
