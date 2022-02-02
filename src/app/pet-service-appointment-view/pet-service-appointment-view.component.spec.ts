import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetServiceAppointmentViewComponent } from './pet-service-appointment-view.component';

describe('PetServiceAppointmentViewComponent', () => {
  let component: PetServiceAppointmentViewComponent;
  let fixture: ComponentFixture<PetServiceAppointmentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetServiceAppointmentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetServiceAppointmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
