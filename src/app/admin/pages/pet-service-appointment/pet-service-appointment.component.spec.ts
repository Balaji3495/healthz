import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetServiceAppointmentComponent } from './pet-service-appointment.component';

describe('PetServiceAppointmentComponent', () => {
  let component: PetServiceAppointmentComponent;
  let fixture: ComponentFixture<PetServiceAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetServiceAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetServiceAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
