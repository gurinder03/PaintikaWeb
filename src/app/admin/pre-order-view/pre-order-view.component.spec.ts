import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreOrderViewComponent } from './pre-order-view.component';

describe('PreOrderViewComponent', () => {
  let component: PreOrderViewComponent;
  let fixture: ComponentFixture<PreOrderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreOrderViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
