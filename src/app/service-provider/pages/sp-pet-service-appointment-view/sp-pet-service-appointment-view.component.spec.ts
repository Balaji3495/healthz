import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpPetServiceAppointmentViewComponent } from './sp-pet-service-appointment-view.component';

describe('SpPetServiceAppointmentViewComponent', () => {
  let component: SpPetServiceAppointmentViewComponent;
  let fixture: ComponentFixture<SpPetServiceAppointmentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpPetServiceAppointmentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpPetServiceAppointmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
