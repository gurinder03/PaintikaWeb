import { Component, OnInit, ViewChild } from '@angular/core';
import jsonData from '../../core/jsonDummyData/cateList.json';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AdminApiService } from 'src/app/core/services/admin-api.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  @ViewChild('empTbSort') empTbSort = new MatSort();

  constructor(
    public adminApi: AdminApiService,
    public toast: ToastrService,
    public navCtrl: NavigationRouteService
  ){}

  displayedColumns: string[] = ['serialNo', 'name','image', 'createdAt', 'name_slug', 'status', 'button'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.getCategoryList()
  }


  getCategoryList(){
    let data = {
      "page":1,
      "limit":10
    }
    this.adminApi.getAdminCateList(data).then((res:any) =>{
      debugger
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

  createCategory(){
    this.navCtrl.goTo('/admin/add-category')
  }

}
