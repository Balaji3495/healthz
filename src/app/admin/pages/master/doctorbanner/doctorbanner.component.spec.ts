import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorbannerComponent } from './doctorbanner.component';

describe('DoctorbannerComponent', () => {
  let component: DoctorbannerComponent;
  let fixture: ComponentFixture<DoctorbannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorbannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorbannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
