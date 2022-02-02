import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderSpecializationComponent } from './service-provider-specialization.component';

describe('ServiceProviderSpecializationComponent', () => {
  let component: ServiceProviderSpecializationComponent;
  let fixture: ComponentFixture<ServiceProviderSpecializationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceProviderSpecializationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProviderSpecializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
