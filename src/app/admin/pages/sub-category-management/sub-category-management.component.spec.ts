import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryManagementComponent } from './sub-category-management.component';

describe('SubCategoryManagementComponent', () => {
  let component: SubCategoryManagementComponent;
  let fixture: ComponentFixture<SubCategoryManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCategoryManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
