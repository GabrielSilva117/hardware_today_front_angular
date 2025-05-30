import { Injectable } from '@angular/core';
import axios from 'axios';
import {environment} from '../../enviroments/enviroment';
import {CategoryModel} from '../models/utils/CategoryModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private api

  constructor() {
    this.api = axios.create({
      baseURL: environment.apiUrl + '/category',
      withCredentials: true
    })
  }

  getAllCategories() {
    return this.api.get<CategoryModel[]>('');
  }
}
