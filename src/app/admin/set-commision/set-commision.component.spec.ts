import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCommisionComponent } from './set-commision.component';

describe('SetCommisionComponent', () => {
  let component: SetCommisionComponent;
  let fixture: ComponentFixture<SetCommisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetCommisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetCommisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
