import { Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-painter-order-list',
  templateUrl: './painter-order-list.component.html',
  styleUrls: ['./painter-order-list.component.scss']
})
export class PainterOrderListComponent {

  pageIndex: number = 1;
	pageSize: number = 10;
	length: number = 10;
  orderList: any = {};

  displayedColumns: string[] = ['serialNo', 'order_number','order_total', 'payment_status', 'created_at', 'payment_id', 'payment_method', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild('empTbSort') empTbSort = new MatSort();

  

  constructor(
    public router: Router,
    public api: ApiService,
    public auth: AuthencationService,
    public toast: ToastrService
  ){
    this.getArtistList();
  }

  viewOrderList(data:any){
    this.router.navigate(['/admin/painter-order-list-view'], {
      queryParams: {
        listId: data._id,
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.empTbSort.disableClear = true;
    this.dataSource.sort = this.empTbSort;
  }

  getArtistList(event?: PageEvent) {
    this.pageIndex = event?.pageIndex ?? 0;
		this.pageSize = event?.pageSize ?? 10;
    let pageSize = event?.pageSize ?? 10;
		let pageNumber = event?.pageIndex ? event.pageIndex + 1 : 1;

    let resData = {
			page: pageNumber,
			limit: pageSize,
			user_id: this.auth.getUserData()._id,
		};
    
    this.api.artistOrderList(resData).then((res: any) => {
      if (res && res.statusCode === 200) {
        res.data.forEach((item:any, index:any) => {
          item.serialNumber = index + 1;
        });
        this.dataSource = new MatTableDataSource(res.data);
        this.empTbSort.disableClear = true;
        this.length = res.total;
        this.dataSource.sort = this.empTbSort;
        this.orderList = res;
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    });
  }
}
