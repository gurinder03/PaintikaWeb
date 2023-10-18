import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { PaintingListComponent } from './painting-list/painting-list.component';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCategoryComponent } from './add-category/add-category.component';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PaintingVeiwComponent } from './painting-veiw/painting-veiw.component';
import { UserViewComponent } from './user-view/user-view.component';
import { SettingComponent } from './setting/setting.component';
import { UpdateSettingComponent } from './update-setting/update-setting.component'; 
import { MatDialogModule } from '@angular/material/dialog';
import { OrderListViewComponent } from './order-list-view/order-list-view.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { PreOrderListComponent } from './pre-order-list/pre-order-list.component';
import { PreOrderViewComponent } from './pre-order-view/pre-order-view.component';
import { SetCommisionComponent } from './set-commision/set-commision.component';
import { PainterOrderListComponent } from './painter-order-list/painter-order-list.component';
import { PainterOrderListViewComponent } from './painter-order-list-view/painter-order-list-view.component';

@NgModule({
  declarations: [
    CategoryListComponent,
    OrderListComponent,
    UserListComponent,
    PaintingListComponent,
    AddCategoryComponent,
    PaintingVeiwComponent,
    UserViewComponent,
    SettingComponent,
    UpdateSettingComponent,
    OrderListViewComponent,
    CategoryViewComponent,
    PreOrderListComponent,
    PreOrderViewComponent,
    SetCommisionComponent,
    PainterOrderListComponent,
    PainterOrderListViewComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule, 
  ]
})
export class AdminModule { 
  
}
