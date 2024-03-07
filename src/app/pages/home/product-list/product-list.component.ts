import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { AdminApiService } from 'src/app/core/services/admin-api.service';
import { ApiService } from 'src/app/core/services/api.service';
import { FunctionService } from 'src/app/core/services/function.service';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';
import { Options, LabelType } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  allData: any = [];
  minPrice: number = 0;
  maxPrice: number = 50000;
  pageIndex: number = 1;
  pageSize: number = 10;
  length: number = 10;
  mediumData:any = [];
  frameQuality:any = [];
  selectedPrice: number = 0;
  selectedMinimunPrice: number = 0;
  options: Options = {
    floor: 0,
    ceil: 10000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price: </b> ₹ ' + value;
        case LabelType.High:
          return '<b>Max price: </b> ₹ ' + value;
        default:
          return '₹ ' + value;
      }
    }
  };
  selectedValue: any = '';
  getAllCity: any = [];
  categoryList: any = [];
  resDataSearch: any = {
    page: this.pageIndex,
    limit: this.pageSize,
    filter: '',
    categories: [],
    is_copy_sale: '',
    frame_quality: [],
    color: [],
    theme: [],
    artists_dictionary:"",
    new_arivals:"",
    size: [],
    medium: [],
    price: {},
  };
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
    if(this.minPrice || this.maxPrice){
      this.resDataSearch.price = {min:this.minPrice, max:this.maxPrice},
      this.productData(PageEvent, this.resDataSearch);
    }else{
      this.toast.error('Please Select Min and Max Price');
    }
  }

  updateMinimumRange() {}

  generateAlphabetArray() {
    for (let i = 65; i <= 90; i++) {
      this.alphabetArray.push(String.fromCharCode(i));
    }
  }

  setActive(letter: string) {
    this.activeLetter = letter;
    this.resDataSearch.artists_dictionary = letter;
    this.productData(PageEvent, this.resDataSearch);
  }

  addToCart(item: any) {
    if (this.auth.isAuthenticated()) {
      item.isLiked = !item.isLiked;
      const index = this.fun.cartData?.findIndex((cartItem: any) => cartItem.art_id === item?._id);
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

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((queryParams: any) => {
      this.fun.productId = [];
      if (queryParams && queryParams.params && queryParams.params.productId) {
        this.fun.productId.push(queryParams.params.productId);
        this.resDataSearch.categories = this.fun.productId;
      }else if(queryParams?.params?.start && queryParams?.params?.end){
        this.resDataSearch.categories = [];
        this.resDataSearch.price = {min:Number(queryParams?.params?.start), max:Number(queryParams?.params?.end)},
        this.productData(PageEvent, this.resDataSearch);
      }else if(queryParams && queryParams.params && queryParams.params.colors){
        let colorsData = JSON.parse(queryParams.params.colors)
        this.resDataSearch.color = colorsData;
        this.productData(PageEvent, this.resDataSearch);
      }else if(queryParams && queryParams.params && queryParams.params.medium){
        this.resDataSearch.medium.push(queryParams.params.medium)
        this.productData(PageEvent, this.resDataSearch);
      }else if(queryParams && queryParams.params && queryParams.params.is_copy_sale){
        this.resDataSearch.is_copy_sale = queryParams.params.is_copy_sale
        this.productData(PageEvent, this.resDataSearch);
      }else if(queryParams && queryParams.params && queryParams.params.theme){
        this.resDataSearch.theme.push(queryParams.params.theme)
        this.productData(PageEvent, this.resDataSearch);
      }else if(queryParams && queryParams.params && queryParams.params.new_arivals){
        this.resDataSearch.new_arivals = queryParams.params.new_arivals
        this.productData(PageEvent, this.resDataSearch);
      }
      else {
        this.resDataSearch.categories = [];
      }
      this.productData(PageEvent, this.resDataSearch);
    });
    this.getCities();
    this.getCategoryList();
  }

  getCategoryList() {
    let data = {
      page: 1,
      limit: 100,
    };
    this.api.productList(data).then((res: any) => {
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
      this.fun.productId = this.fun.productId.filter(
        (item: any) => item !== cat._id
      );
    }
    if (this.fun.productId && this.fun.productId.length > 0) {
      this.resDataSearch.categories = this.fun.productId;
      this.productData(PageEvent, this.resDataSearch);
    }
  }

  allDataGet(){
    this.activeLetter = '';
    this.resDataSearch = {
      page: this.pageIndex,
      limit: this.pageSize,
      filter: '',
      categories: [],
      is_copy_sale: '',
      frame_quality: [],
      color: [],
      artists_dictionary:"",
      size: [],
      medium: [],
      new_arivals:"",
      theme: [],
      price: {},
    };
    this.productData(PageEvent, this.resDataSearch);
  }

  toggleCheckMedium(ev: any, medium: any){
      if (ev.checked) {
        this.mediumData.push(medium);
      } else {
        this.mediumData = this.mediumData.filter((item: any) => item !== medium);
      }
      if (this.mediumData && this.mediumData.length > 0) {
        this.resDataSearch.medium = this.mediumData;
        this.productData(PageEvent, this.resDataSearch);
      }else{
        this.resDataSearch.medium = []
        this.productData(PageEvent, this.resDataSearch);
      }
  }

  toggleCheckFarme(ev: any, quality: any){
      if (ev.checked) {
        this.frameQuality.push(quality);
      } else {
        this.frameQuality = this.frameQuality.filter((item: any) => item !== quality);
      }
      if (this.frameQuality && this.frameQuality.length > 0) {
        this.resDataSearch.frame_quality = this.frameQuality;
        this.productData(PageEvent, this.resDataSearch);
      }else{
        this.resDataSearch.frame_quality = []
        this.productData(PageEvent, this.resDataSearch);
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
    this.resDataSearch.filter = filter
    // this.filterData = filter;
    this.productData(PageEvent, this.resDataSearch);
  }

  productData(ele: any, dataSet: any) {
    this.pageIndex = ele?.pageIndex ?? 0;
    this.pageIndex = ele?.pageIndex ?? 0;
    this.pageSize = ele?.pageSize ?? 10;
    let pageNumber = ele?.pageIndex ? ele.pageIndex + 1 : 1;
    this.resDataSearch.page = pageNumber;
    this.resDataSearch.limit = this.pageSize;
    this.api.productDataList(this.resDataSearch).then((res: any) => {
      if (res && res.statusCode === 200) {
        for (let index = 0; index < res.data.length; index++) {
          const element = res.data[index];
          element.isLiked = false;
        }
        this.length = res.total;
        this.allData = res.data;
        this.updateIsLikedStatus(this.allData, this.fun.cartData);
        this.activatedRoute.queryParamMap.subscribe((queryParams) => {
          const dataView: any = queryParams.get('dataSet');
          let parseData = JSON.parse(dataView);
          if (parseData) {
            this.filterPriceData(parseData, this.allData);
          }
        });
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
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    });
  }

  
  serachData(ele:any){
    this.fun.searchBol = ele;
  }
  closeSearch(ele:any){
    this.resDataSearch.filter = '';
    this.productData(PageEvent, this.resDataSearch);
    this.fun.searchBol = ele;
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
    this.navCtrl.goTo(`/page/add-to-cart`);
  }

  filterPriceData(data: any, allData: any) {
    let filteredPriceData = allData.filter((item: any) => {
      const price = item.price;
      return price >= data.startRange && price <= data.endRange;
    });
    this.allData = filteredPriceData;
  }
}
