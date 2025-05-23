import {Component, Input} from '@angular/core';
import {ProductModel} from '../../../models/product/ProductModel';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';
import {MatMiniFabButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-product-list',
  imports: [
    NgForOf,
    MatMiniFabButton,
    MatIconModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  @Input() filteredProducts: ProductModel[] = [];

  constructor(private router: Router) {}

  openProductPage(productId: string) {
    this.router.navigate([`/product/${productId}`]);
  }

  addProductToCart(event: Event) {
    event.stopPropagation();
  }
}
