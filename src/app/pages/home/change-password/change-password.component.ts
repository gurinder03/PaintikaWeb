import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthencationService } from 'src/app/core/auth/authencation.service';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm!: FormGroup
  constructor(
    public api: ApiService,
    public fb: FormBuilder,
    public toast: ToastrService,
    public auth: AuthencationService
  ){

  }

  ngOnInit(): void {
    this.formData()
  }

  formData(){
    this.passwordForm = this.fb.group({
      current_password: ['', [Validators.required, Validators.minLength(6)]],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      id: ['', [Validators.required]],
    });
  }

  ngSubmit(){
    this.passwordForm.markAsTouched()
    if(this.passwordForm.valid){
      this.api.userPassChange(this.passwordForm.value).then((res:any)=>{
        if(res && res.statusCode == 200){
          console.log('res data => ', res);
        }
        else{
          this.toast.error(res.message)
        }
      })
    }else{
      this.toast.error('Form is not valid')
    }
  }

  
}
