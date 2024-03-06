import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { FunctionService } from 'src/app/core/services/function.service';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  fullyear: any;
  applicationName = 'Paintika'

  constructor(
    public auth: AuthencationService,
    public fun: FunctionService,
    public navCtrl: NavigationRouteService,
    private router: Router
  ){

  }

  ngOnInit() {
    this.fullyear = new Date().getFullYear()
  }

  navigateTo(route: string, ev: any) {
    localStorage.setItem('activeNav', ev);
    this.fun.navValue = ev;
    if (
      route == '6592522ee68ffdd98a8d6716' ||
      route == '658bd173e68ffdd98a8d6458' ||
      route == '658bd143e68ffdd98a8d6453'
    ) {
      this.fun.productId = [];
      this.router.navigate(['/product-list'], {
        queryParams: {
          productId: route
        },
      });
    } else {
      this.router.navigate([route]);
    }
  }

  artByPrice(rangeStart:any, rangeEnd:any, ele:any){
    this.fun.navValue = ele;
    this.router.navigate(['/product-list'],  {
      queryParams: {
        start: rangeStart,
        end:rangeEnd
      },
    })
  }
  sellArt(ele:any){
    if(this.auth.isAuthenticated() && this.auth.getUserData().role != 'USER'){
      this.navCtrl.goTo(ele)
    }else{
      this.fun.confirmBox('','Before Procceed you need to login as artist','/auth/login','Ok','Cancel');
    }
  }
}
