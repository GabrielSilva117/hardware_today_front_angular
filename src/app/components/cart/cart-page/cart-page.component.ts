import {Component, OnInit} from '@angular/core';
import {CartService} from '../../../services/cart.service';
import {CartModel} from '../../../models/cart/CartModel';
import {CartDetailComponent} from '../cart-detail/cart-detail.component';
import {CartHorizontalListComponent} from '../cart-horizontal-list/cart-horizontal-list.component';
import {CartCheckoutComponent} from '../cart-checkout/cart-checkout.component';
import {NgIf} from '@angular/common';
@Component({
  selector: 'app-cart-page',
  imports: [
    CartDetailComponent,
    CartHorizontalListComponent,
    CartCheckoutComponent,
    NgIf
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {
  cartList!: CartModel[];
  activeCart!: CartModel;
  state = 'cart_detail';

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.getAllCarts();
  }

  onStateChange(newState: string) {
    this.state = newState;
    console.log(this.state);
  }

  private getAllCarts() {
    this.cartService.getAllCartsFromUser().then(response => {
      console.log(response.data);
      if (response.data) {
        this.activeCart = response.data.activeCart;
        this.cartList = response.data.inactiveCarts;
      }
    });

  }
}
