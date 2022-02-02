import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpSpecializationComponent } from './sp-specialization.component';

describe('SpSpecializationComponent', () => {
  let component: SpSpecializationComponent;
  let fixture: ComponentFixture<SpSpecializationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpSpecializationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpSpecializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
