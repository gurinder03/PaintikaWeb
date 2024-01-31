import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { ApiService } from 'src/app/core/services/api.service';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  selectedRange: string = '';
  pageIndex: number = 1;
	pageSize: number = 10;
	length: number = 10;
  filterData: any = '';
  pagesData:any = {}
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed:700,
    autoplay:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      200: {
        items: 2
      },
      440: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: true
  }
  data: any = []
  constructor(
    private api: ApiService,
    public toast: ToastrService,
    private auth: AuthencationService,
    public navCtrl: NavigationRouteService,
    public raute:Router
  ){
    let userData = this.auth.getUserData();
    if( auth.isAuthenticated() && userData && userData.role === "ADMIN"){
      this.navCtrl.goTo('/admin/user-list')
    }
  }

  ngOnInit(): void {
    this.getData()
  }

  applyFilter(event: Event){
    debugger
    const filterValue = (event.target as HTMLInputElement).value;
    let filter = filterValue.trim().toLowerCase();
    // let filteredData = this.data.filter((item: any) => {
    //   return item.name.toLowerCase().includes(filter);
    // });
    this.filterData = filter;
    this.getData()
    console.log('this.data => ',  this.filterData);
  }

  getData(ele?: PageEvent){
    this.pagesData = ele;
    this.pageIndex = ele?.pageIndex ?? 0;
		this.pageSize = ele?.pageSize ?? 10;

		let pageSize = ele?.pageSize ?? 10;
		let pageNumber = ele?.pageIndex ? ele.pageIndex + 1 : 1;
    let resData = {
			page: pageNumber,
			limit: pageSize,
      filter: this.filterData
		};
    this.api.productList(resData).then((res: any) => {
      if (res && res.statusCode === 200) {
        this.data = res.data;
        this.length = res.total;
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    });
  }

  getMore(product:any){
    if(this.auth.isAuthenticated()){
      this.navCtrl.goTo(`/page/product-list/${product?._id}`)
    }else{
      this.navCtrl.goTo(`/product-list/${product?._id}`)
    }
  }

  filterByPrice(rangeStart:any, rangeEnd:any){
    this.selectedRange = rangeStart + '-' + rangeEnd;
    let data = {startRange: rangeStart, endRange: rangeEnd}
    this.raute.navigate(['/page/product-list/6592672de68ffdd98a8d67f6'],  {
      queryParams: {
        dataSet: JSON.stringify(data)
      },
    })
    console.log('Selected Range:', this.selectedRange);
  }
}
