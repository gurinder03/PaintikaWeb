import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationRouteService {

  navtigationData = null;
  constructor(
    public route: Router
  ) { }

  goTo(url:any, data:any = null, direction: 'forward' | 'back' | 'root' = 'forward') {
    if (data != null) {
      this.navtigationData = data;
    }
    switch (direction) {
      case 'forward': {
        this.route.navigateByUrl(url);
        break;
      }
      case 'back': {
        this.route.navigate([`${url}`]);
        break;
      }
      default: {
        this.route.navigate([`${url}`]);
        break;
      }
    }
  }
}
