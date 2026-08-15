import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductListComponent} from '../product-list/product-list.component';
import {ProductFilterComponent} from '../product-filter/product-filter.component';
import {ProductModel} from '../../../models/product/ProductModel';
import {ProductService} from '../../../services/product.service';
import FilterModel from '../../../models/product/FilterModel';
import {debounceTime, Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-product-page',
  imports: [
    ProductListComponent,
    ProductFilterComponent
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit, OnDestroy {
  productList: ProductModel[] = [];
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
      this.productService.getProductList(filter).then(page => {
        if (page.status == 200) this.productList = page.data.content;
      });
    });
    // this.fetchProducts()
    // this.productService.products$.subscribe(products => {if (products) this.productList = products});
  }

  onFilterChange(partial: Partial<FilterModel>): void {
    this.productService.updateFilter(partial); // dropdown changes write here
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
