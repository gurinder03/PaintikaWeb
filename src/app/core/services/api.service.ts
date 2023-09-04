import { Injectable } from '@angular/core';
import { RequestService } from '../utility/handler/request.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private request: RequestService
  ) { }



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
 
}
