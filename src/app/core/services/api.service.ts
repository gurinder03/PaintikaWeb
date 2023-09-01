import { Injectable } from '@angular/core';
import { RequestService } from '../utility/handler/request.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private request: RequestService
  ) { }
 
}
