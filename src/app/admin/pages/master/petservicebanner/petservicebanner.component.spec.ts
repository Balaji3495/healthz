import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetservicebannerComponent } from './petservicebanner.component';

describe('PetservicebannerComponent', () => {
  let component: PetservicebannerComponent;
  let fixture: ComponentFixture<PetservicebannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetservicebannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetservicebannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
