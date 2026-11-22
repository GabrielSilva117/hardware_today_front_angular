import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {DefaultButtonComponent} from '../../utils/default-button/default-button.component';
import {PaymentPayload} from '../../../models/payment/paymentPayload';
import {PaymentType} from '../../../models/payment/PaymentType';
import {CartService} from '../../../services/cart.service';
import {StripeService} from '../../../services/stripe.service';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    DefaultButtonComponent
  ],
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements AfterViewInit, OnDestroy {
  constructor(private cartService: CartService, private stripeService: StripeService) { }

  @Output() paymentSubmit = new EventEmitter<PaymentPayload>();
  @ViewChild('cardNumberElement') cardNumberElementRef?: ElementRef<HTMLElement>;
  @ViewChild('cardExpiryElement') cardExpiryElementRef?: ElementRef<HTMLElement>;
  @ViewChild('cardCvcElement') cardCvcElementRef?: ElementRef<HTMLElement>;

  selectedMethod: PaymentType = 'CARD';
  methods: PaymentType[] = ['CARD', 'pix', 'boleto', 'paypal'];

  cpf = '';
  cardError: string | null = null;
  submitting = false;

  get payButtonLabel(): string {
    const labels: Record<PaymentType, string> = {
      CARD: 'Pay R$ 218,00',
      pix: 'Pay via PIX',
      boleto: 'Generate Boleto',
      paypal: 'Continue to PayPal'
    };
    return labels[this.selectedMethod];
  }

  ngAfterViewInit(): void {
    if (this.cardNumberElementRef && this.cardExpiryElementRef && this.cardCvcElementRef) {
      this.stripeService.mountCardElements({
        number: this.cardNumberElementRef.nativeElement,
        expiry: this.cardExpiryElementRef.nativeElement,
        cvc: this.cardCvcElementRef.nativeElement
      }).catch(() => this.cardError = 'Could not load card input, please reload the page.');
    }
  }

  ngOnDestroy(): void {
    this.stripeService.unmountCardElements();
  }

  async onSubmit(): Promise<void> {
    if (this.submitting) return;
    this.submitting = true;
    this.cardError = null;

    try {
      let paymentMethodId: string | undefined;
      if (this.selectedMethod === 'CARD') {
        paymentMethodId = await this.stripeService.createPaymentMethod();
      }

      const res = await this.cartService.getCartId();
      const cartId = res.data;
      const payload: PaymentPayload = {
        type: this.selectedMethod,
        amount: 213,
        cartId: cartId,
        currency: 'USD',
        ...(this.selectedMethod === 'CARD' && { paymentMethodId }),
        ...(this.selectedMethod === 'boleto' && { cpf: this.cpf }),
      };
      this.paymentSubmit.emit(payload);
    } catch (e) {
      this.cardError = e instanceof Error ? e.message : 'Failed to process card details.';
    } finally {
      this.submitting = false;
    }
  }
}
