import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {
  
  orders: any = []

  constructor(
    public auth: AuthencationService,
    public api: ApiService,
    public toast: ToastrService
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
      console.log('res => ', res);
      if (res && res.statusCode === 200) {
        this.orders = res.data
        // this.toast.success(res.message);
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    })
  }
}
