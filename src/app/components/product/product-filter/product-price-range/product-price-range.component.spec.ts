import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPriceRangeComponent } from './product-price-range.component';

describe('ProductPriceRangeComponent', () => {
  let component: ProductPriceRangeComponent;
  let fixture: ComponentFixture<ProductPriceRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPriceRangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPriceRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
