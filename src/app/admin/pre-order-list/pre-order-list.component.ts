import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/core/services/admin-api.service';

@Component({
  selector: 'app-pre-order-list',
  templateUrl: './pre-order-list.component.html',
  styleUrls: ['./pre-order-list.component.scss']
})
export class PreOrderListComponent implements OnInit {

  pageIndex: number = 1;
	pageSize: number = 10;
	length: number = 10;
  constructor(
    public adminApi: AdminApiService,
    public toast: ToastrService
  ){}

  @ViewChild('empTbSort') empTbSort = new MatSort();

  ngOnInit(): void {
      this.getData()
  }

  getData(event?: PageEvent) {
    this.pageIndex = event?.pageIndex ?? 0;
		this.pageSize = event?.pageSize ?? 10;
    let pageSize = event?.pageSize ?? 10;
		let pageNumber = event?.pageIndex ? event.pageIndex + 1 : 1;

    let resData = {
			page: pageNumber,
			limit: pageSize,
		};

    this.adminApi.listDataPreorder(resData).then((res:any) =>{
      if (res && res.statusCode === 200) {
        res.data.forEach((item:any, index:any) => {
          item.serialNumber = index + 1;
        });
        this.empTbSort.disableClear = true;
        this.length = res.total;
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        console.log('Something went wrong');
      }
    })
  }

}
