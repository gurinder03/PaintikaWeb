import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import jsonData from '../../core/jsonDummyData/userlist.json';
import { MatSort } from '@angular/material/sort';
import { AdminApiService } from 'src/app/core/services/admin-api.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { AuthencationService } from 'src/app/core/auth/authencation.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  allData: any = []
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild('paginator') paginator!: MatPaginator;
  
  constructor(
    public adminApi: AdminApiService,
    private toast: ToastrService,
    public auth: AuthencationService
  ){ }
  
  displayedColumns: string[] = ['serailNo', 'name', 'email_or_mobile_number','role','createdAt','profile_image','button'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  setEvent:any = {};
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    console.log('paginator => ', this.dataSource.paginator);
    if(this.auth.isAuthenticated()){
      this.getUsers()
    }
  }

  getUsers(){
    let data = {
      "page":this.setEvent && this.setEvent.pageIndex ? this.setEvent.pageIndex + 1 : 1,
      "limit": this.setEvent && this.setEvent.pageSize ? this.setEvent.pageSize : 10,
      "role":"USER"
    }
    debugger
    this.adminApi.getAllUser(data).then((res:any) =>{
      if (res && res.statusCode === 200) {
        res.data.forEach((item:any, index:any) => {
          item.serialNumber = index + 1;
        });
        this.allData = res.data
        this.dataSource = new MatTableDataSource(res.data)
        this.dataSource.data = res.data
        this.dataSource.paginator = this.paginator;
        this.empTbSort.disableClear = true;
        this.dataSource.sort = this.empTbSort;
        console.log('res.data => ', res.data);
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    })
  }

  ngAfterViewInit() {
		this.empTbSort.disableClear = true;
		this.dataSource.sort = this.empTbSort;
	}

  pageChanged(event: any) {debugger
    this.paginator.pageIndex = event.pageIndex;
    this.setEvent = event
    this.getUsers();
  }
}
