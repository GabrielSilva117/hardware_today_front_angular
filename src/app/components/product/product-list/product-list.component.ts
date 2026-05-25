import {Component, inject, Input} from '@angular/core';
import {ProductModel} from '../../../models/product/ProductModel';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';
import {MatMiniFabButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CartService} from '../../../services/cart.service';
import { NotificationService } from '../../../services/notification.service';

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
  private notify = inject(NotificationService);

  constructor(private router: Router, private cartService: CartService) {}

  openProductPage(productId: string) {
    this.router.navigate([`/product/${productId}`]);
  }

  addProductToCart(event: Event, productId: string) {
    event.stopPropagation();
    this.cartService.addProductToCart(productId).then(res => {
      if (res.status == 200) {
        this.notify.show({
          type: 'success',
          title: res.data + ' was added to the cart',
          message: 'Changes will reflect shortly.',
          duration: 5000,
          dismissible: true,
          action: { label: 'View cart', callback: () => this.router.navigate(['/cart']) }
        });
      }
  }).catch((err) => console.error(err));
  }
}
