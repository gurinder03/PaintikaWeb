import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent {
  constructor(
    public activatedRoute: ActivatedRoute,
    public api: ApiService,
    public toast: ToastrService
  ){
    this.activatedRoute.params.subscribe((event: any) => {
      if (event) {
        this.getOrder(event.id);
      }
    });
  }

  getOrder(id: any){
    this.api.orderView(id).then((res:any)=>{
      console.log('res => ', res);
      if (res && res.statusCode === 200) {
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    })
  }
}
