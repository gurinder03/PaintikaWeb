import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { OrderStatusComponent } from './order-status/order-status.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { ArtistOrderListComponent } from './artist-order-list/artist-order-list.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ViewOrderListComponent } from './view-order-list/view-order-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import {MatSliderModule} from '@angular/material/slider';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

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
    OrderStatusComponent,
    ViewOrderComponent,
    ArtistOrderListComponent,
    ViewOrderListComponent,
    ChangePasswordComponent,
    AboutUsComponent,
    ContactUsComponent,
    DashboardComponent,
    ProjectsComponent,
    TestimonialComponent,
    PrivacyPolicyComponent,
    TermsConditionComponent,

  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSliderModule,
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
    MatSortModule,
    MatNativeDateModule,
    MatTableModule,
    MatSliderModule
  ],
  providers: [WindowRefService]
})
export class HomeModule { 
 
}
