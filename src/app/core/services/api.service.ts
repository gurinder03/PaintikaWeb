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

  checkOut(data:any){
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value);
        }
        else {
          reject(value.statusText);
        }
      };
      this.request.send('checkoutOrder', data, success, null, true);
    });
  }

  orderList(data:any){
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value);
        }
        else {
          reject(value.statusText);
        }
      };
      this.request.send('orderList', data, success, null, true);
    });
  }

  
  addOrder(data:any){
    debugger
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value);
        }
        else {
          reject(value.statusText);
        }
      };
      this.request.send('addOrder', data, success, null, true);
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
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value && value.statusCode == 200) {
          this.cartList = value.data;
          this.fun.cartCount = value.data.carts.length;
          resolve(value);
        }
        else {
          this.toast.error(value.statusText)
          reject(value.statusText);
        }
      };
      this.request.send('cartListData', data, success, null, true);
    });
  }

  delAddressList(data:any){
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value && value.statusCode == 200) {
          resolve(value);
        }
        else {
          this.toast.error(value.statusText)
          reject(value.statusText);
        }
      };
      this.request.send('delAddressList', data, success, null, true);
    });
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

  async getSingleUser(id:any) {
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
  
  async updateUserProfile(data: any) {
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value)
        } else {
          reject(value.statusText)
        }
      };
      this.request.send("updateUser", data, success, null, true);
    });
  }

  async delveryAddress(data: any) {
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value)
        } else {
          reject(value.statusText)
        }
      };
      this.request.send("delAddress", data, success, null, true);
    });
  }

  async deleteAddress(data: any) {
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value)
        } else {
          reject(value.statusText)
        }
      };
      this.request.send("deleteAddress", data, success, null, true);
    });
  }


  async updateUserAddress(data: any, id:any) {
    let cateId = data.category;
    let status = data.status;
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value)
        } else {
          reject(value.statusText)
        }
      };
      this.request.send("delAddressUpdate", { id, cateId, status }, success, null, true);
    });
  }

  async getAddress(id:any) {
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value)
        } else {
          reject(value.statusText)
        }
      };
      this.request.send("getSingleAddress", { id }, success, null, true);
    });
  }
 
}
