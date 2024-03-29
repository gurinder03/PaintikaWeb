import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { ApiService } from 'src/app/core/services/api.service';
import { FunctionService } from 'src/app/core/services/function.service';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {;

  selectedRange: string = '';
  pageIndex: number = 1;
	pageSize: number = 10;
	length: number = 10;
  filterData: any = '';
  filter_data_by_color: string = 'new_arrivals'
  fileterData:any
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
    public auth: AuthencationService,
    public navCtrl: NavigationRouteService,
    public raute:Router,
    public fun: FunctionService
  ){
    let userData = this.auth.getUserData();
    if( auth.isAuthenticated() && userData && userData.role === "ADMIN"){
      this.navCtrl.goTo('/admin/user-list')
    }
  }

  ngOnInit(): void {
    this.getData();
    this.everythingSee(this.filter_data_by_color)
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    let filter = filterValue.trim().toLowerCase();
    this.filterData = filter;
    this.getData()
  }

  addToCart(item: any) {
    if (this.auth.isAuthenticated()) {
      item.isLiked = !item.isLiked;
      const index = this.fun.cartData?.findIndex((cartItem: any) => cartItem.art_id === item?._id);
      if (index !== -1) {
     
      } else {
        let data = {
          user_id: this.auth.getUserData()?._id,
          art_id: item?._id,
          quantity: 1,
          creator_id: item?.creator_id,
        };
        this.api.addToCartData(data).then((res: any) => {
          if (res && res.statusCode === 200) {
            this.toast.success(res.message);
            this.api.cartListData({ user_id: this.auth.getUserData()?._id });
          } else if (res.statusCode === 500) {
            this.toast.error(res.message);
          } else {
            this.toast.error('Something went wrong');
          }
        });
      }
    } else {
      this.fun.confirmBox('','Before Procceed you need to login','/auth/login','Ok','Cancel');
    }
  }

  filterByMedium(ele:any){
    this.raute.navigate(['/product-list'], {
      queryParams: {
        medium: ele?.art?.medium
      },
    });
  }

  filterByOriginalArtWork(ele:any){
    this.raute.navigate(['/product-list'], {
      queryParams: {
        is_copy_sale: ele?.is_copy_sale
      },
    });
  }

  getDataByTheme(ele:any){
    this.raute.navigate(['/product-list'], {
      queryParams: {
        theme: ele?.art?.theme
      },
    });
  }
  
  newArivals(ele:any){
    this.raute.navigate(['/product-list'], {
      queryParams: {
        new_arivals: 'yes'
      },
    });
  }

  getData(ele?: PageEvent){
    this.pagesData = ele;
    this.pageIndex = ele?.pageIndex ?? 0;
		this.pageSize = ele?.pageSize ?? 10;
		let pageNumber = ele?.pageIndex ? ele.pageIndex + 1 : 1;
    let resData = {
			page: pageNumber,
			limit: this.pageSize,
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
      this.raute.navigate(['/product-list'], {
        queryParams: {
          productId: product._id
        },
      });
    }else{
      this.raute.navigate(['/product-list'], {
        queryParams: {
          productId: product._id
        },
      });
    }
  }

  everythingSee(dataVal:any){
    this.filter_data_by_color = dataVal;
    let sendData = {
      filter:dataVal
    }
    this.api.dashboardFilter(sendData).then((res: any) => {
      if (res && res.statusCode === 200) {
        this.fileterData = res.data
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    });
  }

  artByPrice(rangeStart:any, rangeEnd:any){
    this.raute.navigate(['/product-list'],  {
      queryParams: {
        start: rangeStart,
        end:rangeEnd
      },
    })
  }

  getColorsData(ele:any){
    this.raute.navigate(['/product-list'],  {
      queryParams: {
        colors: JSON.stringify(ele?.art?.color)
      },
    })
  }

  filterByPrice(rangeStart:any, rangeEnd:any){
    this.selectedRange = rangeStart + '-' + rangeEnd;
    let data = {startRange: rangeStart, endRange: rangeEnd}
    this.raute.navigate(['/page/product-list/6592672de68ffdd98a8d67f6'],  {
      queryParams: {
        dataSet: JSON.stringify(data)
      },
    })
  }
}
