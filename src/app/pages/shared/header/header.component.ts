import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { FunctionService } from 'src/app/core/services/function.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  userData: any = {};
  constructor(
    public auth: AuthencationService,
    private router: Router,
    public fun: FunctionService,
    public toast: ToastrService
  ) {
    this.userData = this.auth.getUserData();
    this.fun.navValue = localStorage.getItem('activeNav');
    console.log('this.userData ', this.userData);
  }
  userLogout() {
    this.auth.logout();
    this.toast.success('Logout Sccessfully');
  }

  navigateTo(route: string, ev: any) {
    console.log('dsfsdfsdff => ', route);
    localStorage.setItem('activeNav', ev);
    this.fun.navValue = ev;
    if (
      route == '6592522ee68ffdd98a8d6716' ||
      route == '658bd173e68ffdd98a8d6458' ||
      route == '658bd143e68ffdd98a8d6453'
    ) {
      console.log('Idsss => ', route, ev);
      this.fun.productId = [];
      this.router.navigate(['/product-list'], {
        queryParams: {
          productId: route
        },
      });
    } else {
      this.router.navigate([route]);
    }
    if (ev === '9') {
      this.auth.logout();
      this.router.navigate([route]);
    }
    if (ev == '10') {
      this.fun.getAdminVal = false;
    }
    if (ev === '8') {
      if(this.auth.isAuthenticated()){
        this.router.navigate([route]);
      }else{
        this.router.navigate(['/auth/login']);
      }
    }
  }

  cartLogin() {
    this.router.navigate(['/auth/login']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  serachData(ele:any){
    this.fun.searchBol = ele;
  }
  closeSearch(ele:any){
    this.fun.searchBol = ele;
  }
}
