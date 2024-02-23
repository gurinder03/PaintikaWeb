import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { AdminApiService } from 'src/app/core/services/admin-api.service';
import { ApiService } from 'src/app/core/services/api.service';
import { FunctionService } from 'src/app/core/services/function.service';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  allData: any = []
  cartData: any = [];
  minPrice: number = 0;
  maxPrice: number = 50000;
  pageIndex: number = 1;
	pageSize: number = 10;
	length: number = 10;
  selectedPrice: number = 0;
  selectedMinimunPrice: number = 0;
  selectedValue: any = '';
  getAllCity: any = [];
  categoryList: any = [];
  filterData: any = '';
  alphabetArray: string[] = [];
  activeLetter: string = '';
  cart: any[] = [];
  constructor(
    public activatedRoute: ActivatedRoute,
    public api: ApiService,
    public toast: ToastrService,
    public fun: FunctionService,
    public adminApi: AdminApiService,
    public auth: AuthencationService,
    private navCtrl: NavigationRouteService
  ) {
    // this.getCartData()  
    this.generateAlphabetArray();
  }


  updateRange() {
    // this.minPrice = this.selectedPrice;
  }

  updateMinimumRange(){

  }

  generateAlphabetArray() {
    for (let i = 65; i <= 90; i++) {
      this.alphabetArray.push(String.fromCharCode(i));
    }
  }

  setActive(letter: string) {
    this.activeLetter = letter;
  }

  applyRange() {
    console.log('Selected price range:', this.selectedMinimunPrice, '-', this.selectedPrice);
  }


  addToCart(item: any) {
    if (this.auth.isAuthenticated()) {
      item.isLiked = !item.isLiked;
      const index = this.cartData?.findIndex((cartItem: any) => cartItem.art_id === item?._id);
      if (index !== -1) {
        // this.cartData?.splice(index, 1);
        // this.api.removeToCart({id:item?._id}).then((res: any) => {
        //   debugger
        //   if (res && res.statusCode === 200) {
        //     this.toast.error(res.message);
        //     this.fun.cartCount = this.cartData?.length
        //   }
        //   else{
        //     this.toast.error('Something went wrong');
        //   }
        //   console.log('this.api.cartList => ', this.cartData);
        // });
      } else {
        let data = {
          "user_id": this.auth.getUserData()?._id,
          "art_id": item?._id,
          "quantity": 1,
          "creator_id": item?.creator_id
        }
        this.api.addToCartData(data).then((res: any) => {
          if (res && res.statusCode === 200) {
            this.toast.success(res.message);
            this.api.cartListData({ user_id: this.auth.getUserData()?._id })
          } else if (res.statusCode === 500) {
            this.toast.error(res.message);
          } else {
            this.toast.error('Something went wrong');
          }
        });
      }
    } else {
      this.fun.confirmBox('', 'Before Procceed you need to login', '/auth/login', 'Ok', 'Cancel')
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((queryParams:any) => {
      this.fun.productId = [];
      this.fun.productId.push(queryParams?.params?.productId)
      this.productData();
    });
    this.getCities();
    this.getCategoryList()
  }


  getCategoryList() {
    let data = {
      page: 1,
      limit: 100,
    };
    this.api.productList(data).then((res: any) => {
      console.log('resresres =>', res);
      if (res && res.statusCode === 200) {
        this.categoryList = res.data;
        this.length = res.total;
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    });
  }

  // toggleCheck(ev: any, data: any) {
  //   console.log('toggleCheck => ', ev, "Setle =>", data);
  //   const uniqueProductIds = new Set(this.productId);
  //   if (!uniqueProductIds.has(data._id)) {
  //     uniqueProductIds.add(data._id);
  //   }
  //   this.productId = Array.from(uniqueProductIds);
  //   this.productData();
  // }

  toggleCheck(ev: any, cat: any) {
    if (ev.checked) {
      this.fun.productId.push(cat._id);
    } else {
      this.fun.productId = this.fun.productId.filter((item:any) => item !== cat._id);
    }
    if(this.fun.productId && this.fun.productId.length > 0){
      this.productData();
    }
  }

  // getCartData(){
  //   if(this.auth.isAuthenticated()){
  //     let data = {user_id: this.auth.getUserData()?._id}
  //     this.api.cartListData(data).then((res:any)=>{
  //       if (res && res.statusCode === 200) {
  //         this.cartData = res.data.carts;
  //         this.activatedRoute.params.subscribe((event: any) => {
  //           if (event) {
  //             this.productData(event.productId);
  //           }
  //         });
  //       } else if (res.statusCode === 500) {
  //         this.toast.error(res.message);
  //       } else {
  //         this.toast.error('Something went wrong');
  //       }
  //     })
  //   }
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    let filter = filterValue.trim().toLowerCase();
    this.filterData = filter;
    // this.productData(this.productId, this.filterData, this.selectedValue)
    console.log('this.data => ', this.filterData);
  }

  productData(ele?: PageEvent) {
    this.pageIndex = ele?.pageIndex ?? 0;
	  this.pageIndex = ele?.pageIndex ?? 0;
		this.pageSize = ele?.pageSize ?? 10;
		let pageNumber = ele?.pageIndex ? ele.pageIndex + 1 : 1;
    let resData = {
			page: pageNumber,
			limit: this.pageSize,
      filter: this.filterData,
      categories: this.fun.productId,
		};

    this.api.productDataList(resData).then((res: any) => {
      console.log('sssss', res);
      
      if (res && res.statusCode === 200) {
        for (let index = 0; index < res.data.length; index++) {
          const element = res.data[index];
          element.isLiked = false
        }
        this.length = res.total;
        this.allData = res.data;
        this.updateIsLikedStatus(this.allData, this.cartData)
        this.activatedRoute.queryParamMap.subscribe((queryParams) => {
          const dataView: any = queryParams.get('dataSet');
          let parseData = JSON.parse(dataView);
          if (parseData) {
            this.filterPriceData(parseData, this.allData)
          }
        });
        console.log('this.allData => ', this.allData);
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    });
  }


  getCities() {
    this.api.getCityData().then((res: any) => {
      if (res && res.statusCode === 200) {
        this.getAllCity = res.data;
        console.log('res', this.getAllCity);
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    });
  }



  selectCity(ele: any) {
    this.selectedValue = ele.target.value;
    // this.productData(this.productId, this.filterData, this.selectedValue)
  }

  updateIsLikedStatus(array1: any[], array2: any[]) {
    for (const item1 of array1) {
      const isLiked = array2?.some((item2) => item2.art_id === item1._id);
      item1.isLiked = isLiked;
    }
  }

  buyNow(id: any) {
    this.navCtrl.goTo(`/page/add-to-cart`)
  }

  filterPriceData(data: any, allData: any) {
    let filteredPriceData = allData.filter((item: any) => {
      const price = item.price;
      return price >= data.startRange && price <= data.endRange;
    });
    this.allData = filteredPriceData
    console.log('filteredPriceData =>', this.allData);
  }
}


