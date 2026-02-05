import { Component } from '@angular/core';
import {DefaultButtonComponent} from '../../utils/default-button/default-button.component';

@Component({
  selector: 'app-cart-checkout',
  imports: [
    DefaultButtonComponent
  ],
  templateUrl: './cart-checkout.component.html',
  styleUrl: './cart-checkout.component.css'
})
export class CartCheckoutComponent {
  onGoBack(): void {
    this.redirectUser('/cart');
  }

  onProceedToPay() : void {
    this.redirectUser('payment');
  }

  redirectUser(route: string): void {
    window.location.href = route;
  }
}
