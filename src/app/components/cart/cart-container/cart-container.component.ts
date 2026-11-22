import {Component, Input} from '@angular/core';
import {CartModel} from '../../../models/cart/CartModel';
import {NgForOf, NgIf} from '@angular/common';
import {CartService} from '../../../services/cart.service';
import {Router} from '@angular/router';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-cart-container',
  imports: [
    NgForOf,
    NgIf,
    MatButton,
    MatIconButton,
    MatIcon,
  ],
  templateUrl: './cart-container.component.html',
  styleUrl: './cart-container.component.css'
})
export class CartContainerComponent {
  @Input() cart!: CartModel;
  @Input() isActiveCart: boolean = false;
  readonly fallbackImage = 'http://localhost:9000/ht-product-assets/e8196503-a1f4-4938-82ac-869a67ab7b97.jpeg';

  constructor(private cartService: CartService, private router: Router) {}

  /** Go to the cart route and full-reload so `CartPageComponent` refetches carts from the API. */
  private refreshRoute(): void {
    void this.router.navigate(['/cart']).then(() => window.location.reload());
  }

  deleteActiveCart() {
    this.cartService.deleteActiveCart().then(response => console.log(response.data));
  }

  removeProductFromCart(productId: string, quantity?: number) {
    const qty = quantity ?? 1;
    this.cartService
      .removeProductFromCart(productId, qty)
      .then(() => this.refreshRoute())
      .catch((err) => console.error(err));
  }

  addProductToCart(productId: string, _quantity?: number) {
    this.cartService
      .addProductToCart(productId)
      .then(() => this.refreshRoute())
      .catch((err) => console.error(err));
  }
}
