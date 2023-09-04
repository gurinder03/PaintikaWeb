import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PaymentOptionsComponent } from './payment-options/payment-options.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadPaintComponent } from './upload-paint/upload-paint.component';

const routes: Routes = [
  {
    path: '',   
    children:[
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'delivery-address',
        component: DeliveryAddressComponent
      },
      {
        path: 'order-summary',
        component: OrderSummaryComponent
      },
      {
        path: 'product-detail',
        component: ProductDetailComponent
      },
      {
        path: 'payment-option',
        component: PaymentOptionsComponent
      },
      {
        path: 'add-to-cart/:category',
        component: AddToCartComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'upload-paint',
        component: UploadPaintComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
