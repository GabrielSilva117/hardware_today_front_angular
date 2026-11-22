import {Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
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
import {Observable, Subject, takeUntil} from 'rxjs';
import {BrandService} from '../../../services/brand.service';
import {CategoryService} from '../../../services/category.service';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import FilterModel from '../../../models/product/FilterModel';
import {DefaultFieldComponent} from '../../utils/default-field/default-field.component';
import {ProductService} from '../../../services/product.service';

const UNBOUNDED_MAX_PRICE = 999999;

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
export class ProductFilterComponent implements OnInit, OnDestroy {
  @Input() paginatedProdPayload!: Observable<any[]>;
  myForm: FormGroup;
  brands: BrandModel[] = [];
  categories: CategoryModel[] = [];
  maxPrice: Number = 0;
  @Output() selectProducts = new EventEmitter();

  private productService = inject(ProductService);
  private destroy$ = new Subject<void>();

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

  ngOnInit(): void {
    // keep the form in sync with the shared filter state (URL seed, search box, resets)
    this.productService.filter$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(filter => {
      this.myForm.patchValue({
        brand: filter.brand ? filter.brand.split(',') : [],
        category: filter.category ? filter.category.split(',') : [],
        minPrice: filter.minPrice || '',
        maxPrice: filter.maxPrice && filter.maxPrice !== UNBOUNDED_MAX_PRICE ? filter.maxPrice : '',
      }, {emitEvent: false});
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  sendData() {
    const filterPayload = this.myForm.value;
    const filterObj: FilterModel = {
      brand: (filterPayload.brand || []).join(),
      category: (filterPayload.category || []).join(),
      maxPrice: Number(filterPayload.maxPrice) || UNBOUNDED_MAX_PRICE,
      minPrice: Number(filterPayload.minPrice) || 0,
    };

    this.selectProducts.emit(filterObj);
  }
}
