import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductListComponent} from '../product-list/product-list.component';
import {ProductFilterComponent} from '../product-filter/product-filter.component';
import {ProductModel} from '../../../models/product/ProductModel';
import {ProductService} from '../../../services/product.service';
import FilterModel from '../../../models/product/FilterModel';
import {debounceTime, Subject, takeUntil} from 'rxjs';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

const DEFAULT_PAGE_SIZE = 12;
const UNBOUNDED_MAX_PRICE = 999999;

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
  pageSize = DEFAULT_PAGE_SIZE;
  pageSizeOptions = [12, 24, 48];
  totalElements = 0;
  private destroy$= new Subject<void>();

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  receiveFilter(filter: FilterModel) {
    this.onFilterChange(filter);
  }

  ngOnInit() {
    // seed filter + paging from the URL so the gallery is shareable/bookmarkable
    const params = this.route.snapshot.queryParamMap;
    this.pageNumber = Number(params.get('page')) || 0;
    this.pageSize = Number(params.get('size')) || DEFAULT_PAGE_SIZE;
    this.productService.updateFilter(this.filterFromParams(params));

    let seeding = true;
    this.productService.filter$.pipe(
      debounceTime(300), // optional safety debounce
      takeUntil(this.destroy$)
    ).subscribe(filter => {
      if (!seeding) this.pageNumber = 0; // a new filter always restarts paging
      seeding = false;
      this.syncUrl(filter);
      this.loadProducts(filter);
    });
  }

  onFilterChange(partial: Partial<FilterModel>): void {
    this.productService.updateFilter(partial); // dropdown changes write here
  }

  onPage(event: PageEvent): void {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    const filter = this.productService.getSnapshot();
    this.syncUrl(filter);
    this.loadProducts(filter);
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

  private filterFromParams(params: ParamMap): Partial<FilterModel> {
    const partial: Partial<FilterModel> = {};
    const term = params.get('term');
    const brand = params.get('brand');
    const category = params.get('category');
    const minPrice = params.get('minPrice');
    const maxPrice = params.get('maxPrice');
    if (term) partial.term = term;
    if (brand) partial.brand = brand;
    if (category) partial.category = category;
    if (minPrice !== null) partial.minPrice = Number(minPrice);
    if (maxPrice !== null) partial.maxPrice = Number(maxPrice);
    return partial;
  }

  private syncUrl(filter: FilterModel): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        term: filter.term || null,
        brand: filter.brand || null,
        category: filter.category || null,
        minPrice: filter.minPrice || null,
        maxPrice: !filter.maxPrice || filter.maxPrice === UNBOUNDED_MAX_PRICE ? null : filter.maxPrice,
        page: this.pageNumber || null,
        size: this.pageSize === DEFAULT_PAGE_SIZE ? null : this.pageSize,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
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
