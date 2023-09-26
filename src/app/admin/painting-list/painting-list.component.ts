import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AdminApiService } from 'src/app/core/services/admin-api.service';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
@Component({
  selector: 'app-painting-list',
  templateUrl: './painting-list.component.html',
  styleUrls: ['./painting-list.component.scss']
})
export class PaintingListComponent implements OnInit {

  listType: string = 'USER';
  allData: any = []
  pageIndex: number = 1;
	pageSize: number = 10;
	length: number = 10;
  @ViewChild('empTbSort') empTbSort = new MatSort();

  constructor(
    public adminApi: AdminApiService,
    public toast: ToastrService,
    public auth: AuthencationService
  ){ }

  ngOnInit(): void {
    if(this.auth.isAuthenticated()){
      this.artList()
    }
  }

  displayedColumns: string[] = ['srNo', 'name', 'status','size',  'price' , 'medium','theme','image','button'];
  dataSource =  new MatTableDataSource<any>();;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.artList()
		this.dataSource.sort = this.empTbSort;
	}

  approve(data:any, status:any){
      console.log('Test => ', data);
      let dataVal = {
        "status": status, 
        "category":data.category
      }
      this.adminApi.updateArtStatus(dataVal, data._id).then((res:any)=>{
        console.log('res => ', res);
        if (res && res.statusCode === 200) {
          this.toast.success('Status ' + res.message);
          this.artList();
        } else if (res.statusCode === 500) {
          this.toast.error(res.message);
        } else {
          this.toast.error('Something went wrong');
        }
      })
  }


  artList(event?: PageEvent) {
    this.dataSource = new MatTableDataSource(this.allData);
		this.pageIndex = event?.pageIndex ?? 0;
		this.pageSize = event?.pageSize ?? 10;
    let pageSize = event?.pageSize ?? 10;
		let pageNumber = event?.pageIndex ? event.pageIndex + 1 : 1;

    let resData = {
			page: pageNumber,
			limit: pageSize,
      role: this.auth.getUserData().role
		};
   
    this.adminApi.adminArtList(resData).then((res:any) =>{
      if (res && res.statusCode === 200) {
        res.data.forEach((item:any, index:any) => {
          item.serialNumber = index + 1;
          item.btnDisabled = false
          if(item.status == "rejected"){
            item.btnDisabled = true
          }
          if(item.status == "approved"){
            item.btnDisabled = true
          }
        });
        console.log('ss => ', res.data);
        
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
}
