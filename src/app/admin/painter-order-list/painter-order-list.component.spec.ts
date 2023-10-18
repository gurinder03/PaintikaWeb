import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainterOrderListComponent } from './painter-order-list.component';

describe('PainterOrderListComponent', () => {
  let component: PainterOrderListComponent;
  let fixture: ComponentFixture<PainterOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainterOrderListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainterOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
