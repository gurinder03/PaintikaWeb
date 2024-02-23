import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/home/dashboard/dashboard.component';
import { AuthGuard } from './core/guard/auth.guard';
import { AdminGuard } from './core/guard/admin.guard';
import { ProductListComponent } from './pages/home/product-list/product-list.component';
import { AboutUsComponent } from './pages/home/about-us/about-us.component';
import { ContactUsComponent } from './pages/home/contact-us/contact-us.component';
import { ProjectsComponent } from './pages/home/projects/projects.component';

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
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canLoad: [AuthGuard]
  },
  {
    // path: 'product-list/:productId',
    path: 'product-list',
    component: ProductListComponent,
    // canLoad: [AuthGuard]
  },  
  {
    path: 'projects',
    component: ProjectsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {
    enableTracing: false 
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
