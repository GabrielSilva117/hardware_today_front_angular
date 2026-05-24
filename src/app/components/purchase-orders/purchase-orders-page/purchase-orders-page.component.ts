import { Component, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PurchaseOrderService } from '../../../services/purchase-order.service';
import { PurchaseOrderModel } from '../../../models/purchase-order/PurchaseOrderModel';

@Component({
  selector: 'app-purchase-orders-page',
  imports: [NgIf, NgForOf, DatePipe, DecimalPipe, RouterLink],
  templateUrl: './purchase-orders-page.component.html',
  styleUrl: './purchase-orders-page.component.css'
})
export class PurchaseOrdersPageComponent implements OnInit {
  orders: PurchaseOrderModel[] = [];
  loading = true;
  error: string | null = null;

  constructor(private purchaseOrderService: PurchaseOrderService) {}

  ngOnInit(): void {
    this.purchaseOrderService
      .getMyOrders()
      .then((res) => {
        this.orders = res.data ?? [];
      })
      .catch(() => {
        this.error = 'Could not load your orders. Please try again later.';
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
