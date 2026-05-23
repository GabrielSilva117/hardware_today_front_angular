import {Component, Input} from '@angular/core';
import {CartModel} from '../../../models/cart/CartModel';
import {NgForOf} from '@angular/common';
import {CartService} from '../../../services/cart.service';
import {MatButton} from '@angular/material/button';
import {DefaultDialogComponent} from '../../utils/default-dialog/default-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-cart-horizontal-list',
  imports: [
    NgForOf,
    MatButton
  ],
  templateUrl: './cart-horizontal-list.component.html',
  styleUrl: './cart-horizontal-list.component.css'
})
export class CartHorizontalListComponent {
  @Input() cart!: CartModel[];

  constructor(private cartService: CartService, private dialog: MatDialog) {}

  openConfirmDialog(id: string) {
    this.dialog.open(DefaultDialogComponent, {
      width: '350px',
      data: {
        title: "Cart conflict!",
        contentText: "There's already an active cart. Do you want to merge or swap them?",
        cancelText: "Cancel",
        confirmText: "Merge",
        thirdButtonText: "Swap",
        onConfirm: () => this.runCartStateAction(id, true),
        onThirdAction: () => this.runCartStateAction(id, false)
      }
    });

  }

  runCartStateAction(id: string, shouldMerge: boolean) : void {
    this.cartService.runCartStateAction({cartToChange: id, shouldMerge: shouldMerge}).then(r => console.log(r.data));
    window.location.reload();
  }

  activateCart(id: string) {
    this.cartService.changeCartState(id).then(response => {
      if (response.data.toString() == "false") {
        this.openConfirmDialog(id);
        return;
      }
      window.location.reload();
    });
  }
}
