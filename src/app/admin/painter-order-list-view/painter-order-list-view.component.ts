import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/core/services/admin-api.service';

@Component({
  selector: 'app-painter-order-list-view',
  templateUrl: './painter-order-list-view.component.html',
  styleUrls: ['./painter-order-list-view.component.scss']
})
export class PainterOrderListViewComponent {

  ordersData:any = {};
  constructor(
    public adminApi: AdminApiService,
    public toast: ToastrService,
    public activatedRoute: ActivatedRoute
  ){

    this.activatedRoute.queryParamMap.subscribe((queryParams) => {
      const listId = queryParams.get('listId');
      this.getOrderListView(listId)
    });

  }

  getOrderListView(listId:any){
    this.adminApi.orderArtView(listId).then((res:any) =>{
      if (res && res.statusCode === 200) {
        this.ordersData = res.data
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error(res.message);
      }
    })
  }

  changeOrderStatus(item: any) {
   let data = {
      id: item._id,
      status: item.status
      //["PENDING", "ACCEPTED", "REJECTED", "ONTHEWAY", "DELIVERED", "CANCELLED"]
    }
    this.adminApi.updateOrderDelStatus(data).then((res:any )=>{
      if (res && res.statusCode === 200) {
        this.ordersData = res.data
        this.toast.success(res.message)
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error(res.message);
      }
    })
  }
}
