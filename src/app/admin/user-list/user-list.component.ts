import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AdminApiService } from 'src/app/core/services/admin-api.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  listType: string = 'USER';
  allData: any = []
  pageIndex: number = 1;
	pageSize: number = 10;
	length: number = 10;
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild('paginator') paginator!: MatPaginator;
  
  constructor(
    public adminApi: AdminApiService,
    private toast: ToastrService,
    public auth: AuthencationService,
    public navCtrl: NavigationRouteService
  ){ }
  
  displayedColumns: string[] = ['serailNo', 'name', 'email_or_mobile_number','role','createdAt','profile_image','button'];
  dataSource = new MatTableDataSource<any>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  ngOnInit(): void {
    if(this.auth.isAuthenticated()){
      this.getData()
    }
  }

  ngAfterViewInit() {
    this.getData();
		this.dataSource.sort = this.empTbSort;
	}

  userView(){
    this.navCtrl.goTo('/admin/user-view')
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
      role: this.listType
		};

    this.adminApi.getAllUser(resData).then((res:any) =>{
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

  updateStatus(status:any, data:any){
    this.adminApi.userStatusUpdate(status, data._id).then((res:any)=>{
      console.log('res => ', res);
      if (res && res.statusCode === 200) {
        this.toast.success('Status ' + res.message);
        this.getData();
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    })
  }

  changeUserType(ele:any){
    this.listType = ele.target.value;
    this.getData();
  }
  
}
