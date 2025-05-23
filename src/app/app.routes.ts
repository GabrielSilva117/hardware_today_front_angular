import { Routes } from '@angular/router';
import {ProductPageComponent} from './components/product/product-page/product-page.component';
import {LoginPageComponent} from './components/login/login-page/login-page.component';
import {AuthGuard} from './auth.guard';
import {ProductDetailComponent} from './components/product/product-detail/product-detail.component';

export const routes: Routes = [
  { path: 'gallery', component: ProductPageComponent, canActivate: [AuthGuard] },
  { path: 'product/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: '**', redirectTo: 'login'},
];
