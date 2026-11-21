import {BrandModel} from '../utils/BrandModel';
import {CategoryModel} from '../utils/CategoryModel';
import {ImageModel} from '../utils/ImageModel';

export interface ProductModel {
  id: string;
  brand: BrandModel;
  category: CategoryModel;
  image?: ImageModel;
  description: string;
  price: number;
  name: string;
}
