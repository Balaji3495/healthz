import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpPetServiceAppointmentComponent } from './sp-pet-service-appointment.component';

describe('SpPetServiceAppointmentComponent', () => {
  let component: SpPetServiceAppointmentComponent;
  let fixture: ComponentFixture<SpPetServiceAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpPetServiceAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpPetServiceAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
