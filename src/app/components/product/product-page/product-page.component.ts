import {Component, OnInit} from '@angular/core';
import {ProductListComponent} from '../product-list/product-list.component';
import {ProductFilterComponent} from '../product-filter/product-filter.component';
import {ProductModel} from '../../../models/product/ProductModel';
import {ProductService} from '../../../services/product.service';

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

  constructor(private productService: ProductService) { }
  // filteredProducts: ProductModel[]
  receiveFilter(test: String) {
    console.log(test);
    // this.productService.setProducts(filteredProducts);
  }

  ngOnInit() {
    this.productService.getProductList().then(products => {
      this.productService.setProducts(products.data)
    }).catch(error => {
      console.error(error);
    })
    this.productService.products$.subscribe(products => {this.productList = products});
  }

}
