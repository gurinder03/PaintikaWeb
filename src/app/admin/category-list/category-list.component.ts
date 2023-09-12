import { Component, OnInit, ViewChild } from '@angular/core';
import jsonData from '../../core/jsonDummyData/cateList.json';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AdminApiService } from 'src/app/core/services/admin-api.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  EmpData = [
    {
      serialNo: 1,
      name: '',
      image: '',
      createdAt: '',
      name_slug: '',
      status: '',
    },
    {
      serialNo: 2,
      name: '',
      image: '',
      createdAt: '',
      name_slug: '',
      status: '',
    },
    {
      serialNo: 3,
      name: '',
      image: '',
      createdAt: '',
      name_slug: '',
      status: '',
    },
    {
      serialNo: 4,
      name: '',
      image: '',
      createdAt: '',
      name_slug: '',
      status: '',
    },
    {
      serialNo: 5,
      name: '',
      image: "",
      createdAt: '',
      name_slug: '',
      status: '',
    },
    {
      serialNo: 6,
      name: '',
      image: '',
      createdAt: '',
      name_slug: '',
      status: '',
    },
    {
      serialNo: 7,
      name: '',
      image: '',
      createdAt: '',
      name_slug: '',
      status: '',
    },
    {
      serialNo: 8,
      name: '',
      image: '',
      createdAt: '',
      name_slug: '',
      status: '',
    },
    {
      serialNo: 9,
      name: '',
      image: '',
      createdAt: '',
      name_slug: '',
      status: '',
    },
    {
      serialNo: 10,
      name: '',
      image: '',
      createdAt: '',
      name_slug: '',
      status: '',
    },
  ];

  

  constructor(
    public adminApi: AdminApiService,
    public toast: ToastrService,
    public navCtrl: NavigationRouteService,
  ){
    this.getCategoryList();
  }

  dataSource = new MatTableDataSource(this.EmpData);
  dataSourceWithPageSize = new MatTableDataSource(this.EmpData);

  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild('paginator') paginator!: MatPaginator;

  displayedColumns: string[] = ['serialNo', 'name','image', 'createdAt', 'name_slug', 'status', 'button'];
  // dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getCategoryList()
    this.empTbSort.disableClear = true;
    this.dataSource.sort = this.empTbSort;
  }


  ngOnInit(): void {
  }

  updateCate(data:any){
    localStorage.setItem('cate_id', data._id)
    this.navCtrl.goTo('/admin/add-category')
  }

  
  getCategoryList(){
    let data = {
      "page": 1,
      "limit": 10
    }
    console.log('data => ', data);
    this.adminApi.getAdminCateList(data).then((res:any) =>{
      if (res && res.statusCode === 200) {
        res.data.forEach((item:any, index:any) => {
          item.serialNumber = index + 1;
        });
        this.dataSource = new MatTableDataSource(res.data);
        // this.dataSource.paginator = this.paginator;
        this.empTbSort.disableClear = true;
        this.dataSource.sort = this.empTbSort;
        console.log('res.data => ', res.data);
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        console.log('Something went wrong');
        // this.toast.error('Something went wrong');
      }
    })
  }

  createCategory(){
    this.navCtrl.goTo('/admin/add-category')
  }

  pageChanged(event: any) {
    this.paginator.pageIndex = event.pageIndex;
    this.getCategoryList()
  }

}
