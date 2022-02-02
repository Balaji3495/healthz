import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorProductdetailComponent } from './vendor-productdetail.component';

describe('VendorProductdetailComponent', () => {
  let component: VendorProductdetailComponent;
  let fixture: ComponentFixture<VendorProductdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorProductdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorProductdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
