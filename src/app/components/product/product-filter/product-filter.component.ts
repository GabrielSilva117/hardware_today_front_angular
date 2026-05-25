import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel, MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatButton} from '@angular/material/button';
import {ProductComboboxComponent} from './product-combobox/product-combobox.component';
import {BrandModel} from '../../../models/utils/BrandModel';
import {CategoryModel} from '../../../models/utils/CategoryModel';
import {map, Observable, take, tap} from 'rxjs';
import {BrandService} from '../../../services/brand.service';
import {CategoryService} from '../../../services/category.service';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import FilterModel from '../../../models/product/FilterModel';
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
export class ProductFilterComponent {
  @Input() paginatedProdPayload!: Observable<any[]>;
  myForm: FormGroup;
  brands: BrandModel[] = [];
  categories: CategoryModel[] = [];
  maxPrice: Number = 0;
  @Output() selectProducts = new EventEmitter();

  constructor(private brandService: BrandService, private categoryService: CategoryService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      brand: [[]],
      category: [[]],
      maxPrice: [''],
      minPrice: [''],
    });
    this.brandService.getAllBrands().then((response) => {
      this.brands = response.data;
    });
    this.categoryService.getAllCategories().then((response) => {
      this.categories = response.data;
    });
  }

  sendData() {
    const filterPayload = this.myForm.value;
    this.paginatedProdPayload.pipe(
      take(1),
      map(products => Math.max(...products.map(obj => obj.price)))
    ).subscribe(maxPrice => {
      const filterObj: FilterModel = {
        brand: filterPayload.brand.join(),
        category: filterPayload.category.join(),
        maxPrice: Number(maxPrice),
        minPrice: Number(filterPayload.minPrice) || 0,
      };
  
      this.selectProducts.emit(filterObj);
    });
  }
}