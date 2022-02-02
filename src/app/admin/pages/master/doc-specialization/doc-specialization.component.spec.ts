import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocSpecializationComponent } from './doc-specialization.component';

describe('DocSpecializationComponent', () => {
  let component: DocSpecializationComponent;
  let fixture: ComponentFixture<DocSpecializationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocSpecializationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocSpecializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
