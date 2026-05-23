import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CartContainerComponent} from '../cart-container/cart-container.component';
import {MatButton} from '@angular/material/button';
import {CartModel} from '../../../models/cart/CartModel';
import {CommonModule} from '@angular/common';
import {CartService} from '../../../services/cart.service';
import { DefaultDialogComponent } from '../../utils/default-dialog/default-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import CartStateChangeModel from '../../../models/cart/CartStateChangeModel';

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

  constructor(private cartService: CartService, private dialog: MatDialog) {}

  confirmStateChange(id: string) {
    this.dialog.open(DefaultDialogComponent, {
      width: '350px',
      data: {
        title: "Inactivate cart",
        contentText: "Are you sure you want to inactivate your cart?",
        cancelText: "Cancel",
        confirmText: "Confirm",
        onConfirm: (values?: Record<string, any>) => this.changeCartState(id, values?.['cart_name']),
        formFields: [
          {
            key: 'cart_name',
            label: 'Cart Name',
            type: 'text',
            placeholder: 'Name this cart draft',
            required: true,
          }
        ],
        // onCancel: () => DefaultDialogComponent.close(true)
      },
    });
  }

  confirmDelete() {
    this.dialog.open(DefaultDialogComponent, {
      width: '350px',
      data: {
        title: "Delete cart",
        contentText: "Are you sure you want to delete your cart? This action will be irrevesible",
        cancelText: "Cancel",
        confirmText: "Confirm",
        onConfirm: () => this.deleteActiveCart(),
      },
    });
  }

  deleteActiveCart (): void {
    this.cartService.deleteActiveCart().then(res => console.log(res.data));
    window.location.reload();
  }

  changeCartState(cartId: string, cartName?: string) {
    const dto: CartStateChangeModel = {
      cartName
    } 
    this.cartService.changeCartState(cartId, dto).then(response => console.log(response.data));
    window.location.reload();
  }

  proceedToCheckout(): void {
    // this.cartService.finishPurchase().then(res => console.log(res.data));
      this.emitter.emit('checkout');
  }
}
