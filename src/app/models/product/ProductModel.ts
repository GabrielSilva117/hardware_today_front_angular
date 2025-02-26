import {BrandModel} from './BrandModel';
import {CategoryModel} from './CategoryModel';

export interface ProductModel {
  id: string;
  brand: BrandModel;
  category: CategoryModel;
  description: string;
  price: number;
  name: string;
}
