import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { PaintingListComponent } from './painting-list/painting-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';

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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
