import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorappointmentviewComponent } from './doctorappointmentview.component';

describe('DoctorappointmentviewComponent', () => {
  let component: DoctorappointmentviewComponent;
  let fixture: ComponentFixture<DoctorappointmentviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorappointmentviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorappointmentviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
