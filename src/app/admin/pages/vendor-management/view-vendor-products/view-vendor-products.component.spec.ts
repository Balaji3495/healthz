import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVendorProductsComponent } from './view-vendor-products.component';

describe('ViewVendorProductsComponent', () => {
  let component: ViewVendorProductsComponent;
  let fixture: ComponentFixture<ViewVendorProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVendorProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVendorProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
