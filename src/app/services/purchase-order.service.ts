import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../../enviroments/enviroment';
import { PurchaseOrderModel } from '../models/purchase-order/PurchaseOrderModel';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: environment.apiUrl + '/purchase-orders',
      withCredentials: true
    });
  }

  getMyOrders() {
    // Use '' not '/': axios merges '/' as a path segment and yields .../purchase-orders/
    // which Spring MVC 6 does not match to /purchase-orders by default.
    return this.api.get<PurchaseOrderModel[]>('');
  }

  getOrder(id: string) {
    return this.api.get<PurchaseOrderModel>(`${id}`);
  }
}
