import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-requirment-paint',
  templateUrl: './requirment-paint.component.html',
  styleUrls: ['./requirment-paint.component.scss']
})

export class RequirmentPaintComponent {
  uploadPaintForm!: FormGroup;
  previews: string[] = [];
  selectedFiles?: any;
  constructor(
    public toast: ToastrService,
    private fb: FormBuilder,
  ) {
    this.formData();
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
    });

}
}
