import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-order-list-view',
  templateUrl: './order-list-view.component.html',
  styleUrls: ['./order-list-view.component.scss']
})
export class OrderListViewComponent {
  orders: any = {}
  constructor(
    public activatedRoute: ActivatedRoute,
    public api: ApiService,
    public toast: ToastrService
  ){
    this.activatedRoute.queryParamMap.subscribe((queryParams) => {
      const orderId = queryParams.get('orderId');
      this.getOrderView(orderId)
    });
  }

  getOrderView(orderId:any){
    this.api.orderView(orderId).then((res:any)=>{
      if (res && res.statusCode === 200) {
        console.log('List View', res);
       this.orders = res.data
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    })
  }


  
}
