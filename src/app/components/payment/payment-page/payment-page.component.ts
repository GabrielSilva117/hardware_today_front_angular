import { Component } from '@angular/core';
import {DefaultButtonComponent} from '../../utils/default-button/default-button.component';

@Component({
  selector: 'app-payment-page',
  imports: [
    DefaultButtonComponent
  ],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent {
  onGoBack(): void {
    window.history.back();
  }
}
