import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../ui/spinner.service';
import API from '../../app/api';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  requestor:any = 'http';
  constructor(
    private http: HttpClient,
    private spinner: SpinnerService,
    private toastr: ToastrService
  ) { }


  url(requestName:any, data:any = {}) {
    let tempurl = '';
    //@ts-expect-error
    if(typeof API.endpoints[requestName].domain == 'undefined') {
      //@ts-expect-error
      tempurl = API.defaultDomain + API.endpoints[requestName].url;
    } else {
      // @ts-expect-error
      tempurl = API.endpoints[requestName].domain + API.endpoints[requestName].url;
    }

    for(const key in data) {
      if(typeof key === 'string')
      {
        const varible = '{{'+ key + '}}';
        tempurl = tempurl.replace( varible, data[key]);
      }
    }

    return tempurl;
  };


  async send(requestName: any, data:any = {}, successHandler:any = null, errorHandler:any = null, backgroundmode = false) {
    let loader:any = null;
    if(backgroundmode === false) {
      console.log('Doone');
      
    }

    const closeLoader= () => {
      console.log('Closed');
    };

    const errorHandlerDefault = (error:any) => {
      if(error.ok !== undefined && error.ok === false) {
        console.log(error);
        this.toastr.error(error.statusText);
      }
      else {
        this.toastr.error('Something went wrong');
      }
    };

    let subscriber = null;
    let add: any = this
    const requestor: HttpClient = add[this.requestor];

    // @ts-expect-error
    if( API.endpoints[requestName].requestType === 'post' || API.endpoints[requestName].requestType === 'put' ) {
      // @ts-expect-error
      subscriber =  requestor[API.endpoints[requestName].requestType]( this.url(requestName, data), data, /* {headers} */ );
    }

    //@ts-expect-error
    if( API.endpoints[requestName].requestType === 'delete') {
      subscriber =  requestor.delete( this.url(requestName, data), {body: null});
    }

    // @ts-expect-error
    if( API.endpoints[requestName].requestType === 'get' ) {
      subscriber =  add[this.requestor].get( this.url(requestName, data));
    }

    if(subscriber !== null)
    {
      subscriber.toPromise().then((value:any) => {
        // subscriber.unsubscribe();
        closeLoader();
        successHandler(value);

      }).catch((error:any) => {
        closeLoader();

          if(errorHandler === null) {
            errorHandlerDefault(error);
          }
      });
    }
  }
}
