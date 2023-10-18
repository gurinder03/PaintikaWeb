import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainterOrderListViewComponent } from './painter-order-list-view.component';

describe('PainterOrderListViewComponent', () => {
  let component: PainterOrderListViewComponent;
  let fixture: ComponentFixture<PainterOrderListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainterOrderListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainterOrderListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
