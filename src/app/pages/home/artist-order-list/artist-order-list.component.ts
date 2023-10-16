import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-artist-order-list',
  templateUrl: './artist-order-list.component.html',
  styleUrls: ['./artist-order-list.component.scss'],
})
export class ArtistOrderListComponent implements OnInit {

  pageIndex: number = 1;
	pageSize: number = 10;
	length: number = 10;
  orderList: any = {};
  dataSource = new MatTableDataSource<any>();
  @ViewChild('empTbSort') empTbSort = new MatSort();
  
  constructor(
    public api: ApiService, 
    public toast: ToastrService,
    public router: Router,
    public auth: AuthencationService
  ) {}

  displayedColumns: string[] = ['serialNo', 'order_number','order_total', 'payment_status', 'created_at', 'payment_id', 'payment_method', 'action'];

  ngOnInit(): void {
    this.getArtistList();
  }

  ngAfterViewInit() {
    this.empTbSort.disableClear = true;
    this.dataSource.sort = this.empTbSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
        console.log('res list => ', res);
        this.orderList = res;
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    });
  }

  viewOrderList(data:any){
    console.log(data);
    this.router.navigate(['/page/view-order-list'], {
      queryParams: {
        listId: data._id,
      },
    });
  }
}
