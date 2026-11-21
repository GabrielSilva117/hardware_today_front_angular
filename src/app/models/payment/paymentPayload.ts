import {PaymentType} from './PaymentType';

export interface PaymentPayload {
  type: PaymentType;
  amount: number;
  currency: string;
  cartId: string;
  paymentMethodId?: string;
  cpf?: string;
}
