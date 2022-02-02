import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderManagementComponent } from './service-provider-management.component';

describe('ServiceProviderManagementComponent', () => {
  let component: ServiceProviderManagementComponent;
  let fixture: ComponentFixture<ServiceProviderManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceProviderManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProviderManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
