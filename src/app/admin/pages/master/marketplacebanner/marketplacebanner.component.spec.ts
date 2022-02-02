import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplacebannerComponent } from './marketplacebanner.component';

describe('MarketplacebannerComponent', () => {
  let component: MarketplacebannerComponent;
  let fixture: ComponentFixture<MarketplacebannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplacebannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplacebannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
