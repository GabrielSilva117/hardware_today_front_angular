import {Component, inject} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {ProductModel} from '../../../models/product/ProductModel';
import {AxiosResponse} from 'axios';
import {ActivatedRoute, Router} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {CartService} from '../../../services/cart.service';
import {NotificationService} from '../../../services/notification.service';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [
    MatIcon,
    MatButton,
    DecimalPipe
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product: ProductModel | undefined;
  private notify = inject(NotificationService);
  qty = 1;
  constructor(private api: ProductService, private route: ActivatedRoute, private cartService: CartService,private router: Router) { }

  ngOnInit() {
    const productId = this.route.snapshot.params['id'];
    this.api.getProductById(productId).then((product: AxiosResponse<ProductModel>) => {this.product = product.data;});
  }

  changeQty(delta: number): void {
    this.qty = Math.max(1, this.qty + delta);
  }

  addToCart(): void {
    if (this.product) this.cartService.addProductToCart(this.product.id, this.qty).then(res => {
      if (res.status === 200) {
        this.notify.show({
          type: 'success',
          title: res.data + ' was added to the cart',
          message: 'Changes will reflect shortly.',
          duration: 5000,
          dismissible: true,
          action: { label: 'View cart', callback: () => this.router.navigate(['/cart']) }
        });
      }
    });
  }
}
