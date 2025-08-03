import {CartProductModel} from './CartProductModel';

export interface CartItemModel {
  quantity: number;
  product: CartProductModel;
}
