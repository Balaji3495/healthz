import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorEditProductdetailComponent } from './vendor-edit-productdetail.component';

describe('VendorEditProductdetailComponent', () => {
  let component: VendorEditProductdetailComponent;
  let fixture: ComponentFixture<VendorEditProductdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorEditProductdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorEditProductdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
