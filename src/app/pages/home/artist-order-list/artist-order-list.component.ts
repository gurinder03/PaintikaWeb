import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-artist-order-list',
  templateUrl: './artist-order-list.component.html',
  styleUrls: ['./artist-order-list.component.scss'],
})
export class ArtistOrderListComponent implements OnInit {
  constructor(
    public api: ApiService,
    public toast: ToastrService
    ) {}

  ngOnInit(): void {
    this.getArtistList()
  }

  getArtistList() {
    let data = {
      page: 1,
      limit: 10,
    };
    this.api.artistOrderList(data).then((res: any) => {
      if (res && res.statusCode === 200) {
        console.log('res => ', res);
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    });
  }
}
