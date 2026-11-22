import { Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeCardNumberElement, StripeElements } from '@stripe/stripe-js';
import { environment } from '../../enviroments/enviroment';

export interface CardElementContainers {
  number: HTMLElement;
  expiry: HTMLElement;
  cvc: HTMLElement;
}

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripePromise: Promise<Stripe | null> = loadStripe(environment.stripePublishableKey);
  private elements: StripeElements | null = null;
  private cardNumberElement: StripeCardNumberElement | null = null;

  async mountCardElements(containers: CardElementContainers): Promise<void> {
    const stripe = await this.stripePromise;
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }
    this.elements = stripe.elements();
    this.cardNumberElement = this.elements.create('cardNumber');
    this.cardNumberElement.mount(containers.number);
    this.elements.create('cardExpiry').mount(containers.expiry);
    this.elements.create('cardCvc').mount(containers.cvc);
  }

  unmountCardElements(): void {
    this.cardNumberElement?.unmount();
    this.cardNumberElement = null;
    this.elements = null;
  }

  async createPaymentMethod(): Promise<string> {
    const stripe = await this.stripePromise;
    if (!stripe || !this.cardNumberElement) {
      throw new Error('Stripe card element is not mounted');
    }
    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: this.cardNumberElement
    });
    if (result.error) {
      throw new Error(result.error.message ?? 'Failed to tokenize card');
    }
    return result.paymentMethod.id;
  }
}
