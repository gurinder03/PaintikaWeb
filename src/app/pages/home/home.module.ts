import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { PaymentOptionsComponent } from './payment-options/payment-options.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadPaintComponent } from './upload-paint/upload-paint.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import { WindowRefService } from 'src/app/core/services/window-ref.service';
import { ProductListComponent } from './product-list/product-list.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { RequirmentPaintComponent } from './requirment-paint/requirment-paint.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { ArtistOrderListComponent } from './artist-order-list/artist-order-list.component';


@NgModule({
  declarations: [
    OrderSummaryComponent,
    PaymentOptionsComponent,
    ProductDetailComponent,
    DeliveryAddressComponent,
    AddToCartComponent,
    ProfileComponent,
    UploadPaintComponent,
    ProductListComponent,
    RequirmentPaintComponent,
    AddAddressComponent,
    OrderStatusComponent,
    ViewOrderComponent,
    ArtistOrderListComponent
   
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    NgFor,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatPaginatorModule,
    CarouselModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [WindowRefService]
})
export class HomeModule { 
 
}
