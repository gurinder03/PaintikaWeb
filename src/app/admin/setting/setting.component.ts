import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/core/services/admin-api.service';
import { UpdateSettingComponent } from '../update-setting/update-setting.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  dataObj: any = {}
  constructor(
    public adminApi: AdminApiService,
    public toast: ToastrService,
    public dialog: MatDialog
  ){

  }

  ngOnInit() {
    this.getAdminSetting();
  }


  getAdminSetting(){
    this.adminApi.getAdminSetting().then((res:any)=>{
      if (res && res.statusCode === 200) {
        this.dataObj = res.data;
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        console.log('Something went wrong');
      }
    })
  }

  updateSetting(data:any){
    const dialogRef = this.dialog.open(UpdateSettingComponent, {
      data: data,
      hasBackdrop: false,
      width: '650px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAdminSetting()
    });
  }
}
