import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthencationService } from '../auth/authencation.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanLoad {
  constructor(private auth: AuthencationService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let user = this.auth.getUserData();
    if (this.auth.isAuthenticated() && user.role == 'ADMIN') {
      this.router.navigate(['/admin/user-list']);
      return false;
    }
    if (this.auth.isAuthenticated() && user.role == 'USER') {
      this.router.navigate(['/dashboard']);
      return false;
    }
    if (this.auth.isAuthenticated() && user.role == 'ARTIST') {
      this.router.navigate(['/page/upload-paint']);
      return false;
    }
    return true;
  }
}
