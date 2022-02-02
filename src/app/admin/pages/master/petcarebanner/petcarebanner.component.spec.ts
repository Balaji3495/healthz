import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetcarebannerComponent } from './petcarebanner.component';

describe('PetcarebannerComponent', () => {
  let component: PetcarebannerComponent;
  let fixture: ComponentFixture<PetcarebannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetcarebannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetcarebannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
