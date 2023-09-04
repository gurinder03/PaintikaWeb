import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit{
 
  getData:any
  constructor(
    public activatedRoute: ActivatedRoute,
    public api: ApiService,
    public toast: ToastrService
  ){

  }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe((event:any) => {
      if(event){
        this.relatedList(event.category)
      }
    });
  }

  relatedList(cate:any){
    let data = {
      "page":1,
      "limit":10,
      "category": [cate]
    }
    this.api.relatedData(data).then((res: any) => {
      if (res && res.statusCode === 200) {
        this.getData = res.data;
        console.log('this.getData => ', this.getData);
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    });
  }
}
