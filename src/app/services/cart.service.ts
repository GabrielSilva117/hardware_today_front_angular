import { Injectable } from '@angular/core';
import axios, {AxiosInstance} from 'axios';
import {environment} from '../../enviroments/enviroment';
import CartStateActionInput from '../models/cart/CartStateActionInput';

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
    return this.api.get('/');
  }

  getAllCartsFromUser() {
    return this.api.get('/user');
  }

  addProductToCart(productId: string) {
    return this.api.post<String>(`/add/${productId}`)
  }

  removeProductFromCart(productId: string, quantity?: number) {
    return this.api.delete<String>(`/product/${productId}` + (quantity && `/${quantity}` || ''));
  }

  changeCartState(cartId: string) {
    return this.api.post<String>(`/toggle-state/${cartId}`);
  }

  runCartStateAction(stateActionInput: CartStateActionInput) {
    return this.api.post<String>(`/state-action`, stateActionInput);
  }

  deleteActiveCart() {
    return this.api.delete(`/`);
  }
}
