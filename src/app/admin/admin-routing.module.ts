import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { PaintingListComponent } from './painting-list/painting-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { PaintingVeiwComponent } from './painting-veiw/painting-veiw.component';
import { UserViewComponent } from './user-view/user-view.component';
import { SettingComponent } from './setting/setting.component';
import { OrderListViewComponent } from './order-list-view/order-list-view.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { PreOrderListComponent } from './pre-order-list/pre-order-list.component';
import { PreOrderViewComponent } from './pre-order-view/pre-order-view.component';

const routes: Routes = [
  {
    path: '',   
    children:[
      {
        path: 'category-list',
        component: CategoryListComponent
      },
      {
        path: 'order-list',
        component: OrderListComponent
      },
      {
        path: 'user-list',
        component: UserListComponent
      },
      {
        path: 'painting-list',
        component: PaintingListComponent
      },
      {
        path: 'add-category',
        component:AddCategoryComponent
      },
      {
        path: 'painting-view',
        component:PaintingVeiwComponent
      },
      {
        path: 'user-view',
        component:UserViewComponent
      },
      {
        path: 'setting',
        component: SettingComponent
      },
      {
        path: 'order-list-view',
        component: OrderListViewComponent
      },
      {
        path: 'category-view',
        component: CategoryViewComponent
      },
      {
        path: 'pre-order-list',
        component: PreOrderListComponent
      },
      {
        path: 'pre-order-view',
        component: PreOrderViewComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
