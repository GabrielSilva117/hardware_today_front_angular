import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CartContainerComponent} from '../cart-container/cart-container.component';
import {MatButton} from '@angular/material/button';
import {CartModel} from '../../../models/cart/CartModel';
import {CommonModule} from '@angular/common';
import {CartService} from '../../../services/cart.service';

@Component({
  selector: 'app-cart-detail',
  imports: [
    CartContainerComponent,
    MatButton,
    CommonModule
  ],
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.css'
})
export class CartDetailComponent {
  @Output() emitter = new EventEmitter<string>();
  @Input() cart!: CartModel;

  constructor(private cartService: CartService) {}

  deleteActiveCart (): void {
    this.cartService.deleteActiveCart().then(res => console.log(res.data));
    window.location.reload();
  }

  changeCartState(cartId: string) {
    this.cartService.changeCartState(cartId).then(response => console.log(response.data));
    window.location.reload();
  }

  proceedToCheckout(): void {
    // this.cartService.finishPurchase().then(res => console.log(res.data));
      this.emitter.emit('checkout');
  }
}
