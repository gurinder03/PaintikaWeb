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
      console.log('res => ', res);
      if (res && res.statusCode === 200) {
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error(res.message);
      }
    })
    
  }

}
