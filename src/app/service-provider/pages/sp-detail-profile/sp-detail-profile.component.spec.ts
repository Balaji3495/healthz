import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpDetailProfileComponent } from './sp-detail-profile.component';

describe('SpDetailProfileComponent', () => {
  let component: SpDetailProfileComponent;
  let fixture: ComponentFixture<SpDetailProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpDetailProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpDetailProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
