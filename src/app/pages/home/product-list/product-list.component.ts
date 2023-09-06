import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { ApiService } from 'src/app/core/services/api.service';
import { FunctionService } from 'src/app/core/services/function.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  allData:any = []
  cart: any[] = [];
  constructor(
    public activatedRoute: ActivatedRoute,
    public api: ApiService,
    public toast: ToastrService,
    private fun: FunctionService,
    public auth: AuthencationService
  ){
  }
  
  addToCart(item:any) {
    console.log(item);
    if(this.auth.isAuthenticated()){
      item.isLiked = !item.isLiked;
      const index = this.api.cartList.carts.findIndex((cartItem:any) => cartItem.art_id === item._id);
      if (index !== -1) {
        debugger
        this.api.cartList.carts.splice(index, 1);
        this.api.removeToCart({id:item._id}).then((res: any) => {
          debugger
          if (res && res.statusCode === 200) {
            this.toast.error(res.message);
            this.fun.cartCount = this.api.cartList.carts.length
          }
          else{
            this.toast.error('Something went wrong');
          }
          console.log('this.api.cartList => ', this.api.cartList);
        });
      } else {
        let data = {
          "user_id":this.fun.getUserData._id,
          "art_id":item._id,
          "quantity":1
        }
        this.api.addToCartData(data).then((res: any) => {
          console.log('res => ', res);
          if (res && res.statusCode === 200) {
            // this.cart.push(res.data);
            this.toast.success(res.message);
            this.api.cartListData({user_id:this.fun.getUserData._id})
            console.log('this.cart => ', this.api.cartList.carts, this.fun.cartCount);
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
        this.productData(event.productId);
      }
    });
  }


  productData(cate:any){
    let data = {
      "page":1,
      "limit":10,
      "category": [cate]
    }
    this.api.productDataList(data).then((res: any) => {
      if (res && res.statusCode === 200) {
        if(res && res.data && res.data.length){
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            element.isLiked = false
          }
          this.allData = res.data;
          this.updateIsLikedStatus(this.allData, this.api.cartList.carts)
        }
        console.log('this.allData => ', this.allData);
        console.log('this. this.api.cartList => ',  this.api.cartList);
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    });
  }

  updateIsLikedStatus(array1: any[], array2: any[]) {
    for (const item1 of array1) {
      const isLiked = array2?.some((item2) => item2.art_id === item1._id);
      item1.isLiked = isLiked;
    }
  }
}


