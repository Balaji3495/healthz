import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetCareAppointmentComponent } from './pet-care-appointment.component';

describe('PetCareAppointmentComponent', () => {
  let component: PetCareAppointmentComponent;
  let fixture: ComponentFixture<PetCareAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetCareAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetCareAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
