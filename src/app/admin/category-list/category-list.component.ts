import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AdminApiService } from 'src/app/core/services/admin-api.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  pageIndex: number = 1;
	pageSize: number = 10;
	length: number = 10;
  categoryList: any = []
  displayedColumns: string[] = ['serialNo', 'name','image', 'createdAt', 'name_slug', 'status', 'button'];

  constructor(
    public adminApi: AdminApiService,
    public toast: ToastrService,
    public navCtrl: NavigationRouteService,
  ){
  }

  dataSource = new MatTableDataSource<any>();

  @ViewChild('empTbSort') empTbSort = new MatSort();


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngAfterViewInit() {
    this.getData()
    this.empTbSort.disableClear = true;
    this.dataSource.sort = this.empTbSort;
  }


  ngOnInit(): void {
    this.getData();
  }

  updateCate(data:any){
    localStorage.setItem('cate_id', data._id)
    this.navCtrl.goTo('/admin/add-category')
  }

  createCategory(){
    localStorage.removeItem('cate_id')
    this.navCtrl.goTo('/admin/add-category')
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

    this.adminApi.getAdminCateList(resData).then((res:any) =>{
      if (res && res.statusCode === 200) {
        res.data.forEach((item:any, index:any) => {
          item.serialNumber = index + 1;
        });
        this.dataSource = new MatTableDataSource(res.data);
        this.empTbSort.disableClear = true;
        this.length = res.total;
        this.dataSource.sort = this.empTbSort;
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        console.log('Something went wrong');
      }
    })
  }

  removeCategory(data:any){
    debugger
    this.adminApi.removeCategory(data._id).then((res:any)=>{
      if (res && res.statusCode === 200) {
        this.getData()
        this.toast.success(res.message);
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        console.log('Something went wrong');
      }
    })
  }
}
