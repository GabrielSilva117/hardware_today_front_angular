import { Component, EventEmitter, Output } from '@angular/core';
import {FormBuilder, FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {DefaultButtonComponent} from '../../utils/default-button/default-button.component';
import {PaymentPayload} from '../../../models/payment/paymentPayload';
import {PaymentType} from '../../../models/payment/PaymentType';
import {CartService} from '../../../services/cart.service';

// import {lookup} from 'binlookup'



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
export class PaymentInfoComponent {
  constructor(private cartService: CartService) { }

  @Output() paymentSubmit = new EventEmitter<PaymentPayload>();

  selectedMethod: PaymentType = 'CARD';
  methods: PaymentType[] = ['CARD', 'pix', 'boleto', 'paypal'];

  card = { number: '', expirationDate: '', cvv: '', cardHolderName: '' };
  cpf = '';

  get payButtonLabel(): string {
    const labels: Record<PaymentType, string> = {
      CARD: 'Pay R$ 218,00',
      pix: 'Pay via PIX',
      boleto: 'Generate Boleto',
      paypal: 'Continue to PayPal'
    };
    return labels[this.selectedMethod];
  }

  onSubmit(): void {
    this.cartService.getCartId().then(res => {
      console.log(res);
      const cartId = res.data;
      const payload: PaymentPayload = {
        type: this.selectedMethod,
        amount: 213,
        cartId: cartId,
        currency: 'USD',
        ...(this.selectedMethod === 'CARD' && { ...this.card }),
        ...(this.selectedMethod === 'boleto' && { cpf: this.cpf }),
      };
      this.paymentSubmit.emit(payload);
    })
  }

  formatCardNumber(value: string): string {
    return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  }
}
