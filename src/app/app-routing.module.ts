import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/home/dashboard/dashboard.component';
import { AuthGuard } from './core/guard/auth.guard';
import { AdminGuard } from './core/guard/admin.guard';
import { ProductListComponent } from './pages/home/product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
    canLoad: [AdminGuard],
  },
  {
    path: 'page',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canLoad: [AuthGuard]
  },
  {
    path: "admin",
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canLoad: [AuthGuard]
  },
  {
    path: 'product-list/:productId',
    component: ProductListComponent,
    canLoad: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {
    enableTracing: false 
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
