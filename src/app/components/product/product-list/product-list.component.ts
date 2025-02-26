import {Component, Input} from '@angular/core';
import {ProductModel} from '../../../models/product/ProductModel';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [
    NgForOf
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  @Input() filteredProducts: ProductModel[] = [];
  // brands: BrandModel[] = [];
  // categories: CategoryModel[] = [];
  //
  // constructor(private productService: ProductService) { }
  //
  // ngOnInit() {
  //   this.productService.getProductList().then(products => {
  //     for (let product of products.data) {
  //       if (this.brands.includes(product.brand)) {
  //         this.brands.push(product.brand);
  //       } else if (this.categories.includes(product.category)) {
  //         this.categories.push(product.category);
  //       }
  //     }
  //
  //     this.productService.setProducts(products.data)
  //   }).catch(error => {
  //     console.error(error);
  //   })
  //   this.productService.products$.subscribe(products => {this.filteredProducts = products});
  // }
}
