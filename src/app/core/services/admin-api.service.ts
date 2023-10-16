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

  adminOrderList(data:any){
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value);
        }
        else {
          reject(value.statusText);
        }
      };
      this.request.send('adminOrderList', data, success, null, true);
    });
  }

  adminArtList(data:any){
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value);
        }
        else {
          reject(value.statusText);
        }
      };
      this.request.send('adminArtList', data, success, null, true);
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

  updateCategroy(data:any){
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value);
        }
        else {
          reject(value.statusText);
        }
      };
      this.request.send('updateCategroy', data, success, null, true);
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

  listDataPreorder(data:any){
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value);
        }
        else {
          reject(value.statusText);
        }
      };
      this.request.send('listPreorder', data, success, null, true);
    });
  }

  async adminLogin(id: number) {
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value)
        } else {
          reject(value.statusText)
        }
      };
      this.request.send("adminLogin", {id}, success, null, true);
    });
  }

  async orderArtView(id: number) {
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value)
        } else {
          reject(value.statusText)
        }
      };
      this.request.send("orderArtView", {id}, success, null, true);
    });
  }

  async adminArtView(id: any) {
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value)
        } else {
          reject(value.statusText)
        }
      };
      this.request.send("adminArtView",{id}, success, null, true);
    });
  }

  async getAdminUserView(id: any) {
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value)
        } else {
          reject(value.statusText)
        }
      };
      this.request.send("adminUserView",{id}, success, null, true);
    });
  }

  async getAdminSetting() {
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value)
        } else {
          reject(value.statusText)
        }
      };
      this.request.send("adminSetting", {} , success, null, true);
    });
  }


  updateSetting(data:any){
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value);
        }
        else {
          reject(value.statusText);
        }
      };
      this.request.send('updateAdminSetting', data, success, null, true);
    });
  }

  async removeCategory(id: number) {
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value)
        } else {
          reject(value)
        }
      };
      this.request.send("removeCategory", {id}, success, null, true);
    });
  }

  async userStatusUpdate(status: any, id:any) {
    return new Promise((resolve, reject) => {
      const success = (value:any) => {
        if (value) {
          resolve(value)
        } else {
          reject(value.statusText)
        }
      };
      this.request.send("userStatusUpdate", { id, status }, success, null, true);
    });
  }

  async updateArtStatus(data: any, id:any) {
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
      this.request.send("updateArtStatus", { id, cateId, status }, success, null, true);
    });
  }

}

