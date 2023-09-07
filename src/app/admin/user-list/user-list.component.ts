import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import jsonData from '../../core/jsonDummyData/userlist.json';
import { MatSort } from '@angular/material/sort';
import { AdminApiService } from 'src/app/core/services/admin-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @ViewChild('empTbSort') empTbSort = new MatSort();
  constructor(
    public adminApi: AdminApiService,
    private toast: ToastrService
  ){ }
  
  displayedColumns: string[] = ['serailNo', 'name', 'email_or_mobile_number','role','createdAt','profile_image','button'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    let data = {
      "page":1,
      "limit":10,
      "role":"USER"
    }
    this.adminApi.getAllUser(data).then((res:any) =>{
      if (res && res.statusCode === 200) {
        res.data.forEach((item:any, index:any) => {
          item.serialNumber = index + 1;
        });
        this.dataSource = new MatTableDataSource(res.data)
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
}
