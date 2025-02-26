import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {ProductPageComponent} from './app/components/product/product-page/product-page.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
