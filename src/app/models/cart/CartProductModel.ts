import {CategoryModel} from '../utils/CategoryModel';
import {ImageModel} from '../utils/ImageModel';
export interface CartProductModel {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: CategoryModel;
  image?: ImageModel;
}
