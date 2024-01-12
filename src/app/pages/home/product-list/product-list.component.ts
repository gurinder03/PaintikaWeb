import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { ApiService } from 'src/app/core/services/api.service';
import { FunctionService } from 'src/app/core/services/function.service';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  allData:any = []
  cartData: any = [];
  selectedValue: any = '';
  getAllCity: any = [];
  filterData: any = '';
  productId: any;
  cart: any[] = [];
  constructor(
    public activatedRoute: ActivatedRoute,
    public api: ApiService,
    public toast: ToastrService,
    private fun: FunctionService,
    public auth: AuthencationService,
    private navCtrl: NavigationRouteService
  ){
    // this.getCartData()
  }
  
  addToCart(item:any) {
    if(this.auth.isAuthenticated()){
      item.isLiked = !item.isLiked;
      const index = this.cartData?.findIndex((cartItem:any) => cartItem.art_id === item?._id);
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
          "user_id":this.auth.getUserData()?._id,
          "art_id":item?._id,
          "quantity":1, 
          "creator_id": item?.creator_id
        }
        this.api.addToCartData(data).then((res: any) => {
          if (res && res.statusCode === 200) {
            this.toast.success(res.message);
            this.api.cartListData({user_id: this.auth.getUserData()?._id})
          } else if (res.statusCode === 500) {
            this.toast.error(res.message);
          } else {
            this.toast.error('Something went wrong');
          }
        });
      }
    }else{
      this.fun.confirmBox('', 'Before Procceed you need to login', '/auth/login', 'Ok', 'Cancel')
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((event: any) => {
      if (event) {
        this.productId = event.productId
        this.productData(this.productId, this.filterData, this.selectedValue);
      }
    });
    this.getCities();
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

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    let filter = filterValue.trim().toLowerCase();
    this.filterData = filter;
    this.productData(this.productId, this.filterData, this.selectedValue)
    console.log('this.data => ',  this.filterData);
  }

  productData(cate:any, filterKey: any, cityVal:any){
    let data = {
      "page":1,
      "limit":30,
      "categories": [cate],
      "filter": filterKey,
      "city": cityVal
    }
    console.log('cityVal => ', cityVal);
    
    this.api.productDataList(data).then((res: any) => {
      if (res && res.statusCode === 200) {
        // if(res && res.data && res.data.length){
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            element.isLiked = false
          }
          this.allData = res.data;
          console.log('this.allData => ', this.allData);
          
          this.updateIsLikedStatus(this.allData, this.cartData)
        // }
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    });
  }

  getCities(){
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

  selectCity(ele:any){
    this.selectedValue = ele.target.value;
    this.productData(this.productId, this.filterData, this.selectedValue)
  }

  updateIsLikedStatus(array1: any[], array2: any[]) {
    for (const item1 of array1) {
      const isLiked = array2?.some((item2) => item2.art_id === item1._id);
      item1.isLiked = isLiked;
    }
  }

  buyNow(id:any){
    this.navCtrl.goTo(`/page/add-to-cart`)
  }
}


