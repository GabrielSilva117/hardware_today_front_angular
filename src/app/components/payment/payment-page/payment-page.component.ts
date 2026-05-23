import { Component } from '@angular/core';
import {DefaultButtonComponent} from '../../utils/default-button/default-button.component';
import {PaymentContainerComponent} from '../payment-container/payment-container.component';

@Component({
  selector: 'app-payment-page',
  imports: [
    DefaultButtonComponent,
    PaymentContainerComponent
  ],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent {
  onGoBack(): void {
    window.history.back();
  }
}
