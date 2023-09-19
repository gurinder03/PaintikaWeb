import { Injectable, OnInit } from '@angular/core';
import { RequestService } from '../utility/handler/request.service';
import { FunctionService } from './function.service';
import { AuthencationService } from '../auth/authencation.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {

  cartList:any = []
  constructor(
    private request: RequestService,
    public fun: FunctionService,
    public auth: AuthencationService,
    public toast: ToastrService
  ) {
    if(this.auth.isAuthenticated()){
      this.cartListData({user_id: this.fun.getUserData._id})
    }
  }
  
  ngOnInit(): void {
      
  }

  productList(data:any){
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value);
        }
        else {
          reject(value.statusText);
        }
      };
      this.request.send('homeList', data, success, null, true);
    });
  }
  
  relatedData(data:any){
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value);
        }
        else {
          reject(value.statusText);
        }
      };
      this.request.send('relatedData', data, success, null, true);
    });
  }

  productDataList(data:any){
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value);
        }
        else {
          reject(value.statusText);
        }
      };
      this.request.send('productList', data, success, null, true);
    });
  }

  addToCartData(data:any){
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value);
        }
        else {
          reject(value.statusText);
        }
      };
      this.request.send('addToCart', data, success, null, true);
    });
  }
  
  uploadPainting(data:any){
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value);
        }
        else {
          reject(value.statusText);
        }
      };
      this.request.send('uploadPainting', data, success, null, true);
    });
  }
  
  cartListData(data:any){
    // return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value && value.statusCode == 200) {
          this.cartList = value.data;
          this.fun.cartCount = value.data.carts.length;
          // resolve(value);
        }
        else {
          this.toast.error(value.statusText)
          // reject(value.statusText);
        }
      };
      this.request.send('cartListData', data, success, null, true);
    // });
  }

  removeToCart(data:any){
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value && value.statusCode == 200) {
          resolve(value);
        }
        else {
          reject(value.statusText);
        }
      };
      this.request.send('removeToCart', data, success, null, true);
    });
  }

  async getSingleUser(id: number) {
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value)
        } else {
          reject(value.statusText)
        }
      };
      this.request.send("getSingleUser",{id}, success, null, true);
    });
  }

  async updateUserProfile(id: number) {
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value)
        } else {
          reject(value.statusText)
        }
      };
      this.request.send("updateUser",{id}, success, null, true);
    });
  }
 
}
