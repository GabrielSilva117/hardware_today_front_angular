import {BrandModel} from '../utils/BrandModel';
import {CategoryModel} from '../utils/CategoryModel';

export interface ProductModel {
  id: string;
  brand: BrandModel;
  category: CategoryModel;
  description: string;
  price: number;
  name: string;
}
