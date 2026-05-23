import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {PaymentInfoComponent} from '../payment-info/payment-info.component';
import {PaymentService} from '../../../services/payment.service';
import {PaymentPayload} from '../../../models/payment/paymentPayload';
import {PaymentStatusComponent} from '../payment-status/payment-status.component';
import {NgIf} from '@angular/common';
import {Subscription} from 'rxjs';
import {WebSocketService} from '../../../services/websocket.service';

export type PaymentFlowState =
  | 'ongoing'
  | 'processing_payment'
  | 'payment_success'
  | 'payment_error';

@Component({
  selector: 'app-payment-container',
  imports: [
    PaymentInfoComponent,
    PaymentStatusComponent,
    NgIf
  ],
  templateUrl: './payment-container.component.html',
})
export class PaymentContainerComponent implements OnDestroy {
  state: PaymentFlowState = 'ongoing';
  private sub: Subscription = new Subscription();
  private redirectTimer: ReturnType<typeof setTimeout> | undefined;

  constructor(
    private paymentService: PaymentService,
    private wsService: WebSocketService,
    private router: Router
  ) {}

  async getCardType(cardNumber?: string) {
    if (!cardNumber) return;

    const bin = cardNumber.replace(/\D/g, '').slice(0, 8);
    const res = await fetch(`https://lookup.binlist.net/${bin}`);
    const data = await res.json();
    console.log(data);
  }

  onPaymentSubmit(payload: PaymentPayload): void {
    this.startListening(payload.cartId);
    this.state = 'processing_payment';
    this.paymentService.processPayment(payload).then(r => {
      if (r.status != 200) {
        this.state = 'payment_error';
      }
    }).catch(() => this.state = 'payment_error');
  }

  private startListening(cartId: string): void {
    this.sub?.unsubscribe(); // avoid duplicate subscriptions if called twice
    this.sub = this.wsService.connect(cartId).subscribe({
      next: (payload) => {
        const success = payload?.status === 'SUCCESS';
        this.state = success ? 'payment_success' : 'payment_error';
        if (success) {
          this.sub?.unsubscribe();
          this.redirectTimer = setTimeout(() => {
            this.redirectTimer = undefined;
            void this.router.navigate(['/gallery']);
          }, 3000);
        }
      },
      error: (err) => {
        this.state = 'payment_error';
      }
    });
  }

  /** Phase passed to the status UI (component is only shown for processing / success / error). */
  get paymentStatusPhase(): 'processing_payment' | 'payment_success' | 'payment_error' {
    switch (this.state) {
      case 'processing_payment':
      case 'payment_success':
      case 'payment_error':
        return this.state;
      default:
        return 'processing_payment';
    }
  }

  ngOnDestroy(): void {
    if (this.redirectTimer !== undefined) {
      clearTimeout(this.redirectTimer);
    }
    this.sub?.unsubscribe();
    this.wsService.disconnect();
  }
}
