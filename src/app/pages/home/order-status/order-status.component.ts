import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { ApiService } from 'src/app/core/services/api.service';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {
  
  orders: any = {}

  constructor(
    public auth: AuthencationService,
    public api: ApiService,
    public toast: ToastrService,
    public navCtrl: NavigationRouteService
  ){
  }

  ngOnInit(): void {
      this.orderList()
  }


  orderList(){
    let data ={
      "user_id": this.auth.getUserData()._id,
      "page":1,
      "limit":10
    }
    this.api.orderList(data).then((res:any)=>{
      if (res && res.statusCode === 200) {
        this.orders = res
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    })
  }

  orderView(order:any){
    this.navCtrl.goTo('/page/order-view/'+ order._id)
  }
}
