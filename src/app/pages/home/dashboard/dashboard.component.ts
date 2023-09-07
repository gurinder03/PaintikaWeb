import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { ApiService } from 'src/app/core/services/api.service';
import { FunctionService } from 'src/app/core/services/function.service';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed:700,
    autoplay:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  data: any = []
  constructor(
    private api: ApiService,
    public toast: ToastrService,
    private auth: AuthencationService,
    public navCtrl: NavigationRouteService,
    private fun: FunctionService
  ){

  }

  ngOnInit(): void {
    this.dataList()
  }

  dataList(){
    let data = {
      "page":1,
      "limit":10
    }
    this.api.productList(data).then((res: any) => {
      if (res && res.statusCode === 200) {
        this.data = res.data;
        console.log('this.data => ', this.data);
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    });
  }

  getProduct(data:any){
    if(this.auth.isAuthenticated()){
      console.log('data', data);
      this.navCtrl.goTo(`/page/add-to-cart/${data._id}`)
    }else{
      console.log('as', data);
      this.fun.confirmBox('', 'Before Procceed you need to login', '/auth/login', 'Ok', 'Cancel')
    }
    
  }

  getMore(product:any){
    this.navCtrl.goTo(`/page/product-list/${product._id}`)
  }
}
