import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingVeiwComponent } from './painting-veiw.component';

describe('PaintingVeiwComponent', () => {
  let component: PaintingVeiwComponent;
  let fixture: ComponentFixture<PaintingVeiwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintingVeiwComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaintingVeiwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
