import {Component, Input} from '@angular/core';
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
  @Input() cart!: CartModel;

  constructor(private cartService: CartService) {}

  deleteActiveCart (): void {
    this.cartService.deleteActiveCart().then(res => console.log(res.data));
    window.location.reload();
  }


}
