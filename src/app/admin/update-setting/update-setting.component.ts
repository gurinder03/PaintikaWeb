import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/core/services/admin-api.service';


export interface DialogData {
  app_mode: string;
  createdAt: string;
  passcode: string;
  tax: string;
  _id: string
}

@Component({
  selector: 'app-update-setting',
  templateUrl: './update-setting.component.html',
  styleUrls: ['./update-setting.component.scss']
})
export class UpdateSettingComponent implements OnInit {
  settingForm!: FormGroup;
  constructor(
    public adminApi: AdminApiService,
    public toast: ToastrService,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateSettingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ){

  }

  ngOnInit(): void {
    console.log('Thius => ', this.data);
    this.formData()
  } 

  formData(){
    this.settingForm = this.fb.group({
      app_mode: ['', [Validators.required]],
      tax: ['', [Validators.required]],
      passcode: ['', [Validators.required]],
    });
    this.setDataValue(this.data)
  }

  setDataValue(data: any){
    if(data){
      this.settingForm.patchValue({app_mode: data.app_mode})
      this.settingForm.patchValue({tax: data.tax})
      this.settingForm.patchValue({passcode: data.passcode})
    }
  }


  onSubmit(){
    this.settingForm.markAllAsTouched();
    if (this.settingForm.valid) {
      this.adminApi.updateSetting(this.settingForm.value).then((res:any)=>{
        if (res && res.statusCode === 200) {
          this.dialogRef.close();
          this.toast.success(res.message)
        } else if (res.statusCode === 500) {
          this.toast.error(res.message);
        } else {
          this.toast.error('Something went wrong');
        }
      })
    } else {
      console.log('Form is not valid');
    }
   
  }

  cancel(){
    this.dialogRef.close();
  }

}
