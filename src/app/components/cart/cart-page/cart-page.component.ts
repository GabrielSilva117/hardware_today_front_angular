import {Component, OnInit} from '@angular/core';
import {CartService} from '../../../services/cart.service';
import {CartModel} from '../../../models/cart/CartModel';
import {CartDetailComponent} from '../cart-detail/cart-detail.component';
@Component({
  selector: 'app-cart-page',
  imports: [
    CartDetailComponent
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {
  cartList!: CartModel;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.getAllCarts();
  }

  private getAllCarts() {
    this.cartService.getAllCartsFromUser().then(response => this.cartList = response.data[0]);
  }
}
