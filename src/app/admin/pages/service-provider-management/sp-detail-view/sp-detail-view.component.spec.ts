import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpDetailViewComponent } from './sp-detail-view.component';

describe('SpDetailViewComponent', () => {
  let component: SpDetailViewComponent;
  let fixture: ComponentFixture<SpDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
