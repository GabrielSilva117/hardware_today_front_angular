import { Injectable } from '@angular/core';
import axios, {AxiosInstance} from 'axios';
import {environment} from '../../enviroments/enviroment';
import {PaymentPayload} from '../models/payment/paymentPayload';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private api : AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: environment.apiUrl + '/payment',
      withCredentials: true
    })
  }

  processPayment(payment : PaymentPayload) {
    return this.api.post<String>('/pay/card', payment);
  }
}
