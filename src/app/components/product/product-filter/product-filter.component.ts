import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel, MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatButton} from '@angular/material/button';
import {ProductComboboxComponent} from './product-combobox/product-combobox.component';
import {ProductModel} from '../../../models/product/ProductModel';
import {BrandModel} from '../../../models/product/BrandModel';
import {CategoryModel} from '../../../models/product/CategoryModel';

@Component({
  selector: 'app-product-filter',
  imports: [
    MatExpansionPanelDescription,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatExpansionPanel,
    MatAccordion,
    MatButton,
    ProductComboboxComponent
  ],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent implements OnInit {
  @Input() paginatedProdPayload: ProductModel[] = [];
  brands: BrandModel[] = [];
  categories: CategoryModel[] = [];
  @Output() selectProducts = new EventEmitter();


  sendData() {
    return this.selectProducts.emit('Filter Products Right NOW!');
  }

  ngOnInit(): void {
    if (this.paginatedProdPayload.length) {
      for (let product of this.paginatedProdPayload) {
        if (this.brands.includes(product.brand)) {
          this.brands.push(product.brand);
        } else if (this.categories.includes(product.category)) {
          this.categories.push(product.category);
        }
      }
    }

  }
}
