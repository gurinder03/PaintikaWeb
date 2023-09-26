import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/core/services/admin-api.service';
import { FunctionService } from 'src/app/core/services/function.service';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})

export class AddCategoryComponent implements OnInit {

  addCateForm!: FormGroup;
  updatedData:any;
  getData: any = {}
  url:any = '';
  setCateId:any
  setImg: any;
  constructor(
    public adminApi: AdminApiService,
    public fb: FormBuilder,
    private fun: FunctionService,
    private toast: ToastrService,
    public navCtrl: NavigationRouteService
  ){}


  ngOnInit(): void {
    this.setCateId = localStorage.getItem('cate_id')
    if(this.setCateId){
      this.getSingleCategory(localStorage.getItem('cate_id'))
    }
    this.formData()
  }

  formData(){
    this.addCateForm = this.fb.group({
      name: ['', [Validators.required]],
      role: ['ADMIN', [Validators.required]],
      creator_id: ['', [Validators.required]],
      status: ['active', [Validators.required]],
    });
  }



  onSubmit() {
    this.addCateForm.patchValue({ creator_id: this.fun.getUserData._id });
    this.addCateForm.markAllAsTouched();
    if (this.addCateForm.valid) {
      let dataVal = new FormData();
      dataVal.append('name', this.addCateForm.value.name);
      dataVal.append('role', this.addCateForm.value.role);
      dataVal.append('creator_id', this.getData.creator_id);
      dataVal.append('status', this.addCateForm.value.status);
      if(this.setImg && this.setImg.length){
        dataVal.append('image', this.setImg[0]);
      }
      if(this.setCateId){
        debugger
        dataVal.append('id', this.getData._id);
        this.adminApi.updateCategroy(dataVal).then((res:any)=>{
          if (res && res.statusCode === 200) {
            console.log('res.data => ', res.data);
            this.toast.success(res.message)
            this.navCtrl.goTo('/admin/category-list')
          } else if (res.statusCode === 500) {
            this.toast.error(res.message);
          } else {
            this.toast.error('Something went wrong');
          }
        })
      } else{
        this.adminApi.addCategoryData(dataVal).then((res:any)=>{
          if (res && res.statusCode === 200) {
            console.log('res.data => ', res.data);
            this.toast.success(res.message)
            this.navCtrl.goTo('/admin/category-list')
          } else if (res.statusCode === 500) {
            this.toast.error(res.message);
          } else {
            this.toast.error('Something went wrong');
          }
        })
      }
    } else {
      console.log('Form is not valid');
    }
  }


  getSingleCategory(id:any){
    this.adminApi.singleCategory(id).then((res:any)=>{
      if (res && res.statusCode === 200) {
        this.getData = res.data;
        this.setDataValue(res.data)
        console.log('res.data => ', res.data);
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        this.toast.error('Something went wrong');
      }
    })
  }

  setDataValue(data:any){
    debugger
    this.addCateForm.patchValue({ name: data.name });
    this.addCateForm.patchValue({ creator_id: data.creator_id });
    this.addCateForm.patchValue({ role: data.role });
    this.addCateForm.patchValue({ status: data.status });
    this.url = data.image;
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

  cancel(){
    localStorage.removeItem('cate_id')
    this.navCtrl.goTo('/admin/category-list')
  }

  
}
