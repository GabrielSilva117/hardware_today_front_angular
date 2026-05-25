import { Injectable } from '@angular/core';
import axios, {AxiosInstance} from 'axios';
import {environment} from '../../enviroments/enviroment';
import CartStateActionInput from '../models/cart/CartStateActionInput';
import CartStateChangeModel from '../models/cart/CartStateChangeModel';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private api : AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: environment.apiUrl + '/cart',
      withCredentials: true
    })
  }

  getCartId() {
    // '' avoids axios turning this into /cart/ (trailing slash); Spring may not match that.
    return this.api.get('');
  }

  getAllCartsFromUser() {
    return this.api.get('user');
  }

  addProductToCart(productId: string) {
    return this.api.post<string>(`add/${productId}`);
  }

  /**
   * Backend requires DELETE /cart/product/{productId}/{quantity}.
   * Quantity must always be sent (1 to decrement one; use line quantity to remove the whole line).
   */
  removeProductFromCart(productId: string, quantity: number = 1) {
    return this.api.delete<string>(`product/${productId}/${quantity}`);
  }

  changeCartState(cartId: string, dto?: CartStateChangeModel) {
    if (!dto) {
      dto = {
        cartName: ''
      };
    }
    
    return this.api.post<string>(`toggle-state/${cartId}`, dto);
  }

  runCartStateAction(stateActionInput: CartStateActionInput) {
    return this.api.post<string>(`state-action`, stateActionInput);
  }

  deleteActiveCart() {
    return this.api.delete('');
  }
}
