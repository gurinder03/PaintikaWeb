import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  setEl:any

  constructor(
    public router: Router,
    public auth: AuthencationService,
    public toast: ToastrService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
  }

  userLogout(){
    this.auth.logout();
    this.toast.success('Logout Sccessfully')
  }


  navigateTo(route: string, ev:any) {
    this.setEl = ev;
    this.router.navigate([route]);
  }
 
  
}
