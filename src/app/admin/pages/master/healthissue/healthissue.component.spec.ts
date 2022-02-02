import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthissueComponent } from './healthissue.component';

describe('HealthissueComponent', () => {
  let component: HealthissueComponent;
  let fixture: ComponentFixture<HealthissueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthissueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthissueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
