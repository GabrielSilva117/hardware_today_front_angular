import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductListComponent} from '../product-list/product-list.component';
import {ProductFilterComponent} from '../product-filter/product-filter.component';
import {ProductModel} from '../../../models/product/ProductModel';
import {ProductService} from '../../../services/product.service';
import FilterModel from '../../../models/product/FilterModel';
import {debounceTime, Subject, takeUntil} from 'rxjs';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-product-page',
  imports: [
    ProductListComponent,
    ProductFilterComponent,
    MatPaginatorModule
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit, OnDestroy {
  productList: ProductModel[] = [];
  pageNumber = 0;
  pageSize = 12;
  pageSizeOptions = [12, 24, 48];
  totalElements = 0;
  private destroy$= new Subject<void>();

  constructor(public productService: ProductService) { }

  receiveFilter(filter: FilterModel) {
    this.onFilterChange(filter);
  }

  ngOnInit() {
    this.productService.filter$.pipe(
      debounceTime(300), // optional safety debounce
      takeUntil(this.destroy$)
    ).subscribe(filter => {
      this.pageNumber = 0; // reset paging when the filter changes
      this.loadProducts(filter);
    });
    // this.fetchProducts()
    // this.productService.products$.subscribe(products => {if (products) this.productList = products});
  }

  onFilterChange(partial: Partial<FilterModel>): void {
    this.productService.updateFilter(partial); // dropdown changes write here
  }

  onPage(event: PageEvent): void {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts(this.productService.getSnapshot());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadProducts(filter?: FilterModel): void {
    this.productService.getProductList(filter, this.pageNumber, this.pageSize).then(page => {
      if (page.status == 200) {
        this.productList = page.data.content;
        this.totalElements = page.data.page.totalElements;
        this.pageNumber = page.data.page.number;
        this.pageSize = page.data.page.size;
      }
    });
  }

  private fetchProducts(filter?: FilterModel) {
    this.productService.getProductList(filter).then(products => {
      console.log(products);
      this.productService.setProducts(products.data?.content)
    }).catch(error => {
      console.error(error);
    })
  }
}
