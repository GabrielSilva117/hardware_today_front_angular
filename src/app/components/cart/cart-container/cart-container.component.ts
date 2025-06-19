import {Component, Input} from '@angular/core';
import {CartModel} from '../../../models/cart/CartModel';
import {NgForOf, NgIf} from '@angular/common';
import {CartService} from '../../../services/cart.service';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-cart-container',
  imports: [
    NgForOf,
    NgIf,
    MatButton,
  ],
  templateUrl: './cart-container.component.html',
  styleUrl: './cart-container.component.css'
})
export class CartContainerComponent {
  @Input() cart!: CartModel;
  @Input() isActiveCart: boolean = false;

  constructor(private cartService: CartService, private router: Router) {}

  removeProductFromCart(productId: string) {
    this.cartService.removeProductFromCart(productId).then(response => console.log(response.data));
    window.location.reload();
  }

}
