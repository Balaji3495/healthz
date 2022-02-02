import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctoreditComponent } from './doctoredit.component';

describe('DoctoreditComponent', () => {
  let component: DoctoreditComponent;
  let fixture: ComponentFixture<DoctoreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctoreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctoreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
