import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirmentPaintComponent } from './requirment-paint.component';

describe('RequirmentPaintComponent', () => {
  let component: RequirmentPaintComponent;
  let fixture: ComponentFixture<RequirmentPaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequirmentPaintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequirmentPaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
