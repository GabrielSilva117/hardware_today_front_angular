import { Injectable } from '@angular/core';
import axios, {AxiosInstance} from 'axios';
import {environment} from '../../enviroments/enviroment';

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

  getAllCartsFromUser() {
    return this.api.get('/user');
  }

  addProductToCart(productId: string) {
    return this.api.post<String>(`/add/${productId}`)
  }

  removeProductFromCart(productId: string) {
    return this.api.delete<String>(`/product/${productId}`);
  }

  deleteActiveCart() {
    return this.api.delete(`/`);
  }
}
