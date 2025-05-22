import { Injectable } from '@angular/core';
import axios from 'axios';
import {environment} from '../../enviroments/enviroment';
import {BrandModel} from '../models/product/BrandModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private api

  constructor() {
    this.api = axios.create({
      baseURL: environment.apiUrl + '/brand',
      withCredentials: true
    })
  }

  getAllBrands() {
    return this.api.get<BrandModel[]>('');
  }
}
