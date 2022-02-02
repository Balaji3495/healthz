import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpDetailComponent } from './sp-detail.component';

describe('SpDetailComponent', () => {
  let component: SpDetailComponent;
  let fixture: ComponentFixture<SpDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
