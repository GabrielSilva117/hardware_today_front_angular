import { Injectable } from '@angular/core';
import FilterModel from '../models/product/FilterModel';
import axios, {AxiosResponse} from 'axios';
import {ProductModel} from '../models/product/ProductModel';
import {environment} from '../../enviroments/enviroment';
import {BehaviorSubject} from 'rxjs';
import {Page} from '../models/utils/PageModel';

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


  private filterState = new BehaviorSubject<FilterModel>({
    term: '',
    brand: '',
    category: '',
    maxPrice: 999999,
    minPrice: 0,
  });

  // exposed as Observable so outside components can't call .next() directly
  filter$ = this.filterState.asObservable();

  updateTerm(term: string): void {
    this.filterState.next({
      ...this.filterState.getValue(),
      term
    });
  }

  updateFilter(partial: Partial<FilterModel>): void {
    this.filterState.next({
      ...this.filterState.getValue(),
      ...partial
    });
  }

  getSnapshot(): FilterModel {
    return this.filterState.getValue();
  }

  getProductList (filter?: FilterModel, page: number = 0, size: number = 12) {
    // if (!filter) {
    //   filter = this.getSnapshot();
    // }
    return this.api.post<Page<ProductModel>>('', filter, { params: { page, size } })
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

  search(filter: FilterModel) {
    return this.api.post<Page<ProductModel>>('', filter)
  }
}
