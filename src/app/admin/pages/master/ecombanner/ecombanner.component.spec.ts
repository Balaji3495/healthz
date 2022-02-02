import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcombannerComponent } from './ecombanner.component';

describe('EcombannerComponent', () => {
  let component: EcombannerComponent;
  let fixture: ComponentFixture<EcombannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcombannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcombannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
