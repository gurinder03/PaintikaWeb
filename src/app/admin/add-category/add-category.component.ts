import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/core/services/admin-api.service';
import { FunctionService } from 'src/app/core/services/function.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  addCateForm!: FormGroup;
  url:any = '';
  setImg: any;
  constructor(
    public adminApi: AdminApiService,
    public fb: FormBuilder,
    private fun: FunctionService,
    private toast: ToastrService
  ){}


  ngOnInit(): void {
      this.formData()
  }

  formData(){
    this.addCateForm = this.fb.group({
      name: ['', [Validators.required]],
      role: ['ADMIN', [Validators.required]],
      creator_id: ['', [Validators.required]],
      status: ['active', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }



  onSubmit() {
    console.log('Add => ', this.addCateForm);
    this.addCateForm.patchValue({ creator_id: this.fun.getUserData._id });
    this.addCateForm.markAllAsTouched();
    if (this.addCateForm.valid) {
      let dataVal = new FormData();
      debugger
      dataVal.append('name', this.addCateForm.value.name);
      dataVal.append('role', this.addCateForm.value.role);
      dataVal.append('creator_id', this.fun.getUserData._id);
      dataVal.append('status', this.addCateForm.value.status);
      dataVal.append('image', this.setImg[0]);
      this.adminApi.addCategoryData(dataVal).then((res:any)=>{
        if (res && res.statusCode === 200) {
          console.log('res.data => ', res.data);
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


  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      this.setImg = event.target.files;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any) => { 
        this.url = event.target.result;
      }
    }
  }

  
}
