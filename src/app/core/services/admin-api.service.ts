import { Injectable } from '@angular/core';
import { RequestService } from '../utility/handler/request.service';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  constructor(
    public request: RequestService
  ) { }

  getAllUser(data:any){
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value);
        }
        else {
          reject(value.statusText);
        }
      };
      this.request.send('userList', data, success, null, true);
    });
  }


  getAdminCateList(data:any){
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
      this.request.send('adminCategoryList', data, success, null, true);
    });
  }

  addCategoryData(data:any){
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value);
        }
        else {
          reject(value.statusText);
        }
      };
      this.request.send('addCategroy', data, success, null, true);
    });
  }

  async singleCategory(id: number) {
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value)
        } else {
          reject(value.statusText)
        }
      };
      this.request.send("singleViewCategory",{id}, success, null, true);
    });
  }
}
