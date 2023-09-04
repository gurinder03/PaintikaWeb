import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: any = []
  constructor(
    private api: ApiService,
    public toast: ToastrService
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
}
