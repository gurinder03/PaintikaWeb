import { Component } from '@angular/core';
import { AuthencationService } from 'src/app/core/auth/authencation.service';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './admin-footer.component.html',
  styleUrls: ['./admin-footer.component.scss']
})
export class AdminFooterComponent {
  constructor(
      public auth: AuthencationService
  ){

  }
}
