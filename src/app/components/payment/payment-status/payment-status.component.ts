import { Component, Input } from '@angular/core';

export type PaymentStatusUiPhase =
  | 'processing_payment'
  | 'payment_success'
  | 'payment_error';

@Component({
  selector: 'app-payment-status',
  imports: [],
  templateUrl: './payment-status.component.html',
  styleUrl: './payment-status.component.css'
})
export class PaymentStatusComponent {
  @Input() phase: PaymentStatusUiPhase = 'processing_payment';
}
