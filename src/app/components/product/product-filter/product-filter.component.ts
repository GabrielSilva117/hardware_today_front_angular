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
import {Observable} from 'rxjs';
import {BrandService} from '../../../services/brand.service';
import {CategoryService} from '../../../services/category.service';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import FilterModel from '../../../models/product/FilterModel';
import {ProductPriceRangeComponent} from './product-price-range/product-price-range.component';
import {DefaultFieldComponent} from '../../utils/default-field/default-field.component';

@Component({
  selector: 'app-product-filter',
  imports: [
    MatExpansionPanelDescription,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatExpansionPanel,
    MatAccordion,
    MatButton,
    ProductComboboxComponent,
    ReactiveFormsModule,
    CommonModule,
    DefaultFieldComponent
  ],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent implements OnInit {
  @Input() paginatedProdPayload!: Observable<any[]>;
  myForm!: FormGroup;
  brands: BrandModel[] = [];
  categories: CategoryModel[] = [];
  @Output() selectProducts = new EventEmitter();

  constructor(private brandService: BrandService, private categoryService: CategoryService, private fb : FormBuilder) {
    this.brandService.getAllBrands().then(response=> {this.brands = response.data;});
    this.categoryService.getAllCategories().then(response=> {this.categories = response.data;});
  }

  sendData() {
    const filterPayload = this.myForm.value;
    const filterObj: FilterModel = {
      brand: filterPayload.brand.join(), category: filterPayload.category.join(), maxPrice: filterPayload.maxPrice, minPrice: filterPayload.minPrice
    }

    return this.selectProducts.emit(filterObj);
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      brand: [[]],
      category: [[]],
      maxPrice: [[]],
      minPrice: [[]],
    })
  }
}
