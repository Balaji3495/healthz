import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAddProductdetailComponent } from './vendor-add-productdetail.component';

describe('VendorAddProductdetailComponent', () => {
  let component: VendorAddProductdetailComponent;
  let fixture: ComponentFixture<VendorAddProductdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAddProductdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAddProductdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
