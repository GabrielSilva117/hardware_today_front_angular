import { Component } from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {ProductModel} from '../../../models/product/ProductModel';
import {AxiosResponse} from 'axios';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product: ProductModel | undefined;

  constructor(private api: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    const productId = this.route.snapshot.params['id'];
    this.api.getProductById(productId).then((product: AxiosResponse<ProductModel>) => {this.product = product.data;});
  }
}
