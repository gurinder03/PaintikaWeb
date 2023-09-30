import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistOrderListComponent } from './artist-order-list.component';

describe('ArtistOrderListComponent', () => {
  let component: ArtistOrderListComponent;
  let fixture: ComponentFixture<ArtistOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistOrderListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
