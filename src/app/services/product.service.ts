import { Injectable } from '@angular/core';
import FilterModel from '../models/product/FilterModel';
import axios, {AxiosResponse} from 'axios';
import {ProductModel} from '../models/product/ProductModel';
import {environment} from '../../enviroments/enviroment';
import {BehaviorSubject} from 'rxjs';
import {Page} from '../models/utils/PageModel';

const FILTER_STORAGE_KEY = 'ht.product.filter';

const DEFAULT_FILTER: FilterModel = {
  term: '',
  brand: '',
  category: '',
  maxPrice: 999999,
  minPrice: 0,
};

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


  // seed from the browser cache so a returning visitor keeps their last filter
  private filterState = new BehaviorSubject<FilterModel>(this.readCachedFilter());

  // exposed as Observable so outside components can't call .next() directly
  filter$ = this.filterState.asObservable();

  private readCachedFilter(): FilterModel {
    try {
      const raw = localStorage.getItem(FILTER_STORAGE_KEY);
      if (raw) return {...DEFAULT_FILTER, ...JSON.parse(raw)};
    } catch {
      // ignore unavailable/corrupt storage and fall back to defaults
    }
    return {...DEFAULT_FILTER};
  }

  private writeCachedFilter(filter: FilterModel): void {
    try {
      localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(filter));
    } catch {
      // storage full or blocked (private mode) — nothing we can do
    }
  }

  updateTerm(term: string): void {
    const next = {...this.filterState.getValue(), term};
    this.writeCachedFilter(next);
    this.filterState.next(next);
  }

  updateFilter(partial: Partial<FilterModel>): void {
    const next = {...this.filterState.getValue(), ...partial};
    this.writeCachedFilter(next);
    this.filterState.next(next);
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
