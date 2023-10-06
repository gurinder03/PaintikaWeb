import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/core/services/admin-api.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
 
  getData: any = {}
  constructor(
    public activatedRoute: ActivatedRoute,
    public adminApi: AdminApiService,
    public toast: ToastrService
  ){

  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((queryParams) => {
      const viewId = queryParams.get('userId');
      this.getUserView(viewId)
    });
  }

  getUserView(id: any){
    this.adminApi.getAdminUserView(id).then((res:any)=>{
      if (res && res.statusCode === 200) {
        this.getData = res.data;
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    })
  }
}
