import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicebannerComponent } from './servicebanner.component';

describe('ServicebannerComponent', () => {
  let component: ServicebannerComponent;
  let fixture: ComponentFixture<ServicebannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicebannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicebannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
