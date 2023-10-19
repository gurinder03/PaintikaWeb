import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/core/services/admin-api.service';
import { ApiService } from 'src/app/core/services/api.service';
import { FunctionService } from 'src/app/core/services/function.service';
import { NavigationRouteService } from 'src/app/core/services/navigation-route.service';

@Component({
  selector: 'app-upload-paint',
  templateUrl: './upload-paint.component.html',
  styleUrls: ['./upload-paint.component.scss'],
})
export class UploadPaintComponent implements OnInit {
  uploadPaintForm!: FormGroup;
  previews: string[] = [];
  selectedFiles?: any;

  categoryList: any = [];

  constructor(
    public toast: ToastrService,
    private fb: FormBuilder,
    public fun: FunctionService,
    public adminApi: AdminApiService,
    public api: ApiService,
    public navCtrl: NavigationRouteService
  ) {
    this.formData();
  }

  ngOnInit() {
    this.getCategoryList();
  }

  selectFiles(event: any): void {
    debugger;
    this.selectedFiles = event.target.files;
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const maxFilesToShow = 10;
      if (this.selectedFiles && this.selectedFiles.length > maxFilesToShow) {
        this.toast.error('You can only select up to 10 images.');
        return;
      } else {
        for (
          let i = 0;
          i < this.selectedFiles.length &&
          this.previews.length < maxFilesToShow;
          i++
        ) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            if (this.previews.length < maxFilesToShow) {
              this.previews.push(e.target.result);
            }
          };
          reader.readAsDataURL(this.selectedFiles[i]);
        }
      }
    }
  }

  formData() {
    this.uploadPaintForm = this.fb.group({
      image: ['', [Validators.required]],
      name: ['', [Validators.required]],
      size: ['', [Validators.required]],
      theme: ['', [Validators.required]],
      medium: ['', [Validators.required]],
      frame_quality: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  onSubmit() {
    debugger
    this.uploadPaintForm.markAllAsTouched();
    if (this.uploadPaintForm.valid) {
      let dataVal = new FormData();
      dataVal.append('role', 'ARTIST');
      dataVal.append('image', this.selectedFiles[0]);
      dataVal.append('name', this.uploadPaintForm.value.name);
      dataVal.append('size', this.uploadPaintForm.value.size);
      dataVal.append('theme', this.uploadPaintForm.value.theme);
      dataVal.append('medium', this.uploadPaintForm.value.medium);
      dataVal.append('frame_quality', this.uploadPaintForm.value.frame_quality);
      dataVal.append('price', this.uploadPaintForm.value.price);
      dataVal.append('creator_id', this.fun.getUserData._id);
      dataVal.append('status', 'active');
      dataVal.append('category', this.uploadPaintForm.value.category);
      this.api.uploadPainting(dataVal).then((res: any) => {
        if (res && res.statusCode === 200) {
          this.toast.success(res.message);
          this.navCtrl.goTo('/dashboard')
        } else if (res.statusCode === 500) {
          this.toast.error(res.message);
        } else {
          this.toast.error('Something went wrong');
        }
      });
    } else {
      this.toast.error('Form is not valid');
    }
  }

  getCategoryList() {
    let data = {
      page: 1,
      limit: 100,
    };
    this.adminApi.getAdminCateList(data).then((res: any) => {
      if (res && res.statusCode === 200) {
        this.categoryList = res.data;
      } else if (res.statusCode === 500) {
        this.toast.error(res.message);
      } else {
        console.log('Something went wrong');
        // this.toast.error('Something went wrong');
      }
    });
  }
}
