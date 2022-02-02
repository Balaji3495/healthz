import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinibannerComponent } from './minibanner.component';

describe('MinibannerComponent', () => {
  let component: MinibannerComponent;
  let fixture: ComponentFixture<MinibannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinibannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinibannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
