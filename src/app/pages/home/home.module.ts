import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { PaymentOptionsComponent } from './payment-options/payment-options.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadPaintComponent } from './upload-paint/upload-paint.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    OrderSummaryComponent,
    PaymentOptionsComponent,
    ProductDetailComponent,
    DeliveryAddressComponent,
    AddToCartComponent,
    ProfileComponent,
    UploadPaintComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
