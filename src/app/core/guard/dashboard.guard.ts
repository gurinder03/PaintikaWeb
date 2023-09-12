import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthencationService } from '../auth/authencation.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

  constructor(
    private auth: AuthencationService, 
    private router: Router
  ){}
    
  canActivate(): boolean {
    let user = this.auth.getUserData()
    if (this.auth.isAuthenticated() && user.role == "ADMIN") {
      this.router.navigate(['/admin/user-list']);
      return true;
    } else if(this.auth.isAuthenticated() && user.role == "USER") {
      this.router.navigate(['/dashboard']);
      return true;
    }
    else{
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
  
}
