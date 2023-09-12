import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthencationService } from '../auth/authencation.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanLoad {
  constructor(
    private router: Router,
    private auth: AuthencationService
    ) {
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isProfile   = this.auth.getUserData()
      debugger
      if(this.auth.isAuthenticated() && isProfile.role == "ADMIN") {
        this.router.navigate(['/admin/user-list']);
        return false;
      }
  
      if(this.auth.isAuthenticated() && isProfile.role == "USER") {
        this.router.navigate(['/page/profile']);
        return false;
      }

      if(this.auth.isAuthenticated() && isProfile.role == "ARTIST") {
        this.router.navigate(['/page/upload-paint']);
        return false;
      }
      
      return true;
  }
}
