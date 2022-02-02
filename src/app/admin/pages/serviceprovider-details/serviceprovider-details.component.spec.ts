import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceproviderDetailsComponent } from './serviceprovider-details.component';

describe('ServiceproviderDetailsComponent', () => {
  let component: ServiceproviderDetailsComponent;
  let fixture: ComponentFixture<ServiceproviderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceproviderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceproviderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
