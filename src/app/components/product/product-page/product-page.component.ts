import {Component, OnInit} from '@angular/core';
import {ProductListComponent} from '../product-list/product-list.component';
import {ProductFilterComponent} from '../product-filter/product-filter.component';
import {ProductModel} from '../../../models/product/ProductModel';
import {ProductService} from '../../../services/product.service';
import FilterModel from '../../../models/product/FilterModel';

@Component({
  selector: 'app-product-page',
  imports: [
    ProductListComponent,
    ProductFilterComponent
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {
  productList: ProductModel[] = [];

  constructor(public productService: ProductService) { }

  receiveFilter(filter: FilterModel) {
    this.fetchProducts(filter);
  }

  ngOnInit() {
    this.fetchProducts()
    this.productService.products$.subscribe(products => {if (products) this.productList = products});
  }


  private fetchProducts(filter?: FilterModel) {
    this.productService.getProductList(filter).then(products => {
      this.productService.setProducts(products.data)
    }).catch(error => {
      console.error(error);
    })
  }
}
