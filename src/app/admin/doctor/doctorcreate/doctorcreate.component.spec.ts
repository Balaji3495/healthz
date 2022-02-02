import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorcreateComponent } from './doctorcreate.component';

describe('DoctorcreateComponent', () => {
  let component: DoctorcreateComponent;
  let fixture: ComponentFixture<DoctorcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
