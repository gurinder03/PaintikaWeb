import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/core/services/admin-api.service';

@Component({
  selector: 'app-view-order-list',
  templateUrl: './view-order-list.component.html',
  styleUrls: ['./view-order-list.component.scss']
})
export class ViewOrderListComponent {
  orders: any = {}
  constructor(
    public activatedRoute: ActivatedRoute,
    public adminApi: AdminApiService,
    public toast: ToastrService
  ){

    this.activatedRoute.queryParamMap.subscribe((queryParams) => {
      const listId = queryParams.get('listId');
      this.getOrderListView(listId)
    });
  }

  getOrderListView(listId:any){
    this.adminApi.orderArtView(listId).then((res:any) =>{
      if (res && res.statusCode === 200) {
        this.orders = res.data
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error(res.message);
      }
    })
    
  }
}
