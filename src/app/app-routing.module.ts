import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';

import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { ServiceProviderComponent } from './service-provider/service-provider.component';
import { AuthguardGuard } from './provider/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login', },
  { path: 'login', component: LoginComponent, },

  {
    path: 'admin', component: AdminComponent,
     canActivate: [AuthguardGuard],
    children: [
      {
        path: '',
        loadChildren: () => import(`./admin/admin.module`).then(m => m.AdminModule)
      },]
  },
  {
    path: 'homepage', component: HomepageComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule)
      },]
  },
  {
    path: 'service_provider', component: ServiceProviderComponent,
    children: [
      {
        path: '',
        loadChildren: () => import(`./service-provider/service-provider.module`).then(m => m.ServiceProviderModule)
      },]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
