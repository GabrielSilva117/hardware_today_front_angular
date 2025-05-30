import {CartProductModel} from './CartProductModel';

export interface CartModel {
  id: String;
  enabled: boolean;
  products: CartProductModel[];
  totalPrice: number;
}
