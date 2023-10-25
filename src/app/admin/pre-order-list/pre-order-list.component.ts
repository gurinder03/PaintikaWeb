import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/core/services/admin-api.service';

@Component({
  selector: 'app-pre-order-list',
  templateUrl: './pre-order-list.component.html',
  styleUrls: ['./pre-order-list.component.scss']
})
export class PreOrderListComponent implements OnInit {
  pageIndex: number = 1;
  allData: any = [];
	pageSize: number = 10;
	length: number = 10;
  constructor(
    public adminApi: AdminApiService,
    public toast: ToastrService,
    private router: Router
  ){}

  @ViewChild('empTbSort') empTbSort = new MatSort();

  displayedColumns: string[] = ['srNo', 'createdAt', 'description', 'image', 'updatedAt'];
  dataSource = new MatTableDataSource<any>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngAfterViewInit() {
		this.empTbSort.disableClear = true;
		this.dataSource.sort = this.empTbSort;
	}


  ngOnInit(): void {
    this.getData()
  }

  getData(event?: PageEvent) {
    this.dataSource = new MatTableDataSource(this.allData);
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
        this.allData = res.data;
        res.data.forEach((item:any, index:any) => {
          item.serialNumber = index + 1;
        });
        this.length = res.total;
        this.dataSource = new MatTableDataSource(this.allData);
        this.empTbSort.disableClear = true;
        this.dataSource.sort = this.empTbSort;
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        console.log('Something went wrong');
      }
    })
  }

  orderView(data:any){
    this.router.navigate(['/admin/pre-order-view'], {
      queryParams: {
        orderId: data._id,
      },
    });
  }
}
