import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';
import { PurchaseOrderService } from '../../../services/purchase-order.service';
import { PurchaseOrderModel } from '../../../models/purchase-order/PurchaseOrderModel';

@Component({
  selector: 'app-purchase-order-detail-page',
  imports: [NgIf, NgForOf, DatePipe, DecimalPipe, RouterLink],
  templateUrl: './purchase-order-detail-page.component.html',
  styleUrl: './purchase-order-detail-page.component.css'
})
export class PurchaseOrderDetailPageComponent implements OnInit {
  order: PurchaseOrderModel | null = null;
  loading = true;
  error: string | null = null;
  orderId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private purchaseOrderService: PurchaseOrderService
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    if (!this.orderId) {
      this.loading = false;
      this.error = 'Missing order reference.';
      return;
    }

    this.purchaseOrderService
      .getOrder(this.orderId)
      .then((res) => {
        this.order = res.data ?? null;
        if (!this.order) {
          this.error = 'Order not found.';
        }
      })
      .catch(() => {
        this.error = 'Could not load this order.';
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
