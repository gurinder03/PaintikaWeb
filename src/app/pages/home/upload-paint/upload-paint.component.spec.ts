import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPaintComponent } from './upload-paint.component';

describe('UploadPaintComponent', () => {
  let component: UploadPaintComponent;
  let fixture: ComponentFixture<UploadPaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadPaintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadPaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
