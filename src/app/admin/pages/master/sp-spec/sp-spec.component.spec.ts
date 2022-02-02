import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpSpecComponent } from './sp-spec.component';

describe('SpSpecComponent', () => {
  let component: SpSpecComponent;
  let fixture: ComponentFixture<SpSpecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpSpecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
