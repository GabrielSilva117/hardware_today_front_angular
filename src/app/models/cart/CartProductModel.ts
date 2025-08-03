import {CategoryModel} from '../utils/CategoryModel';
export interface CartProductModel {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: CategoryModel;
}
