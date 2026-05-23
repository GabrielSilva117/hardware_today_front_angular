import {PaymentType} from './PaymentType';

export interface PaymentPayload {
  type: PaymentType;
  amount: number;
  currency: string;
  cartId: string;
  card?: { number: string; expirationDate: string; cvv: string; cardHolderName: string; };
  cpf?: string;
}
