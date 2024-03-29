import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AdminApiService } from 'src/app/core/services/admin-api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  pageIndex: number = 1;
	pageSize: number = 10;
  allData: any = []
	length: number = 10;
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild('paginator') paginator!: MatPaginator;
  constructor(
    public adminApi: AdminApiService,
    public toast: ToastrService,
    public router: Router
  ){ }

  ngOnInit(): void {
    this.orderList()
  }

  displayedColumns: string[] = ['srNo', 'payment_method', 'created_at', 'status','payment_status','payment_id','order_total', 'action'];
  dataSource =  new MatTableDataSource<any>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
		this.empTbSort.disableClear = true;
		this.dataSource.sort = this.empTbSort;
	}

  orderList(event?: PageEvent) {
    this.dataSource = new MatTableDataSource(this.allData);
		this.pageIndex = event?.pageIndex ?? 0;
		this.pageSize = event?.pageSize ?? 10;
    let pageSize = event?.pageSize ?? 10;
		let pageNumber = event?.pageIndex ? event.pageIndex + 1 : 1;

    let resData = {
			page: pageNumber,
			limit: pageSize,
		};
   
    this.adminApi.adminOrderList(resData).then((res:any) =>{
      if (res && res.statusCode === 200) {
        res.data.forEach((item:any, index:any) => {
          item.serialNumber = index + 1;
        });
        this.allData = res.data
        this.length = res.total;
        this.dataSource = new MatTableDataSource(this.allData);
        this.empTbSort.disableClear = true;
        this.dataSource.sort = this.empTbSort;
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    })
  }

  dataView(data:any){
    this.router.navigate(['/admin/order-list-view'], {
      queryParams: {
        orderId: data._id,
      },
    });
  }
}
