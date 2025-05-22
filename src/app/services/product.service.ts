import { Injectable } from '@angular/core';
import FilterModel from '../models/product/FilterModel';
import axios, {AxiosResponse} from 'axios';
import {ProductModel} from '../models/product/ProductModel';
import {environment} from '../../enviroments/enviroment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productSource = new BehaviorSubject<ProductModel[]>([]);
  products$ = this.productSource.asObservable().pipe()
  api

  constructor() {
    this.api = axios.create({
      baseURL: environment.apiUrl + '/products',
      withCredentials: true
    })
  }

  getProductList (filter?: FilterModel): Promise<AxiosResponse<ProductModel[]>> {
    return this.api.post<ProductModel[]>('', filter)
  }

  setProducts(products: ProductModel[]) {
    this.productSource.next(products);
  }

  getProducts() {
    return this.productSource.getValue();
  }

  getProductById(id: String) {
    return this.api.get<ProductModel>(`/${id}`);
  }
}
