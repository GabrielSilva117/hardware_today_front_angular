import {Component, Input} from '@angular/core';
import {CartModel} from '../../../models/cart/CartModel';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-cart-container',
  imports: [
    NgForOf
  ],
  templateUrl: './cart-container.component.html',
  styleUrl: './cart-container.component.css'
})
export class CartContainerComponent {
  @Input() cart!: CartModel;

}
