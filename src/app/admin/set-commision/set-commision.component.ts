import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/core/services/admin-api.service';



@Component({
  selector: 'app-set-commision',
  templateUrl: './set-commision.component.html',
  styleUrls: ['./set-commision.component.scss']
})
export class SetCommisionComponent implements OnInit {

  commisionForm!: FormGroup
  constructor(
    public dialogRef: MatDialogRef<SetCommisionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    public apiAdmin: AdminApiService,
    public toast: ToastrService
  ){
  }

  ngOnInit(): void {
    this.formData()
    this.setData(this.data)
  }


  formData(){
    this.commisionForm = this.fb.group({
      artist_comission: ['', [Validators.required]],
      id: ['', [Validators.required]],
    });
  }

  setData(data:any){
    if(data){
      this.commisionForm.patchValue({artist_comission: data?.artist_comission})
      this.commisionForm.patchValue({id: data?._id})
    }
  }

  onSubmit() {
    this.commisionForm.markAllAsTouched();
    if (this.commisionForm.valid) {
      this.apiAdmin.updateSetCommision(this.commisionForm.value).then((res:any)=>{
        console.log('res => ', res);
        if(res && res.statusCode == 200){
          this.dialogRef.close();
          this.toast.success(res.message)
        }
        else{
          this.toast.error(res.message)
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
