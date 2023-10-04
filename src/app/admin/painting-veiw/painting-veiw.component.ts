import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/core/services/admin-api.service';

@Component({
  selector: 'app-painting-veiw',
  templateUrl: './painting-veiw.component.html',
  styleUrls: ['./painting-veiw.component.scss']
})
export class PaintingVeiwComponent implements OnInit {
  getData: any = {}
  constructor(
    public adminApi: AdminApiService,
    public toast: ToastrService,
    public activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((queryParams) => {
      debugger
      const viewId = queryParams.get('viewId');
      this.getArtView(viewId)
    });
  }


  getArtView(id:any){
    this.adminApi.adminArtView(id).then((res:any)=>{
      console.log('res  => ', res);
      if (res && res.statusCode === 200) {
        this.getData = res;
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    })
  }

}
