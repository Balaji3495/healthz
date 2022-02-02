import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpTypeComponent } from './sp-type.component';

describe('SpTypeComponent', () => {
  let component: SpTypeComponent;
  let fixture: ComponentFixture<SpTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
