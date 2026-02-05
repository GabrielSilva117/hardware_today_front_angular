import {CartItemModel} from './CartItemModel';

export interface CartModel {
  id: string;
  enabled: boolean;
  items: CartItemModel[];
  totalPrice: number;
  name: string;
}
