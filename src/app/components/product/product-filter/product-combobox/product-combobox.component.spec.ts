import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComboboxComponent } from './product-combobox.component';

describe('ProductComboboxComponent', () => {
  let component: ProductComboboxComponent;
  let fixture: ComponentFixture<ProductComboboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductComboboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComboboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
