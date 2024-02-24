import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PaymentOptionsComponent } from './payment-options/payment-options.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadPaintComponent } from './upload-paint/upload-paint.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RequirmentPaintComponent } from './requirment-paint/requirment-paint.component';

import { OrderStatusComponent } from './order-status/order-status.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { ArtistOrderListComponent } from './artist-order-list/artist-order-list.component';
import { ViewOrderListComponent } from './view-order-list/view-order-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

const routes: Routes = [
  {
    path: '',   
    children:[
      {
        path: 'delivery-address/:id',
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
        path: 'add-to-cart',
        component: AddToCartComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'upload-paint',
        component: UploadPaintComponent
      },
      {
        path: 'product-list',
        component: ProductListComponent
      },
      {
        path: 'requirment-paint',
        component: RequirmentPaintComponent
      },
     
      {
        path: 'order-status',
        component: OrderStatusComponent
      },
      {
        path: 'order-view/:id',
        component: ViewOrderComponent
      },
      {
        path: 'artist-order-list',
        component: ArtistOrderListComponent
      },
      {
        path: 'view-order-list',
        component: ViewOrderListComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
      {
        path: 'testimonial',
        component: TestimonialComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
