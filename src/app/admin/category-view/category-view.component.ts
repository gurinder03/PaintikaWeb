import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/core/services/admin-api.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss']
})
export class CategoryViewComponent {

  getData: any = {}
  constructor(
    public activatedRoute: ActivatedRoute,
    public adminApi: AdminApiService,
    public toast: ToastrService
  ){
    this.activatedRoute.queryParamMap.subscribe((queryParams) => {
      const cateId = queryParams.get('cateId');
      this.getCategoryView(cateId)
    });
  }

  getCategoryView(cateId:any){
    this.adminApi.singleCategory(cateId).then((res:any)=>{
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
