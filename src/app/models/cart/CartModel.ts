import {CartItemModel} from './CartItemModel';

export interface CartModel {
  id: String;
  enabled: boolean;
  items: CartItemModel[];
  totalPrice: number;
}
