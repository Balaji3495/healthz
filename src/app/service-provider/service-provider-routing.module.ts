import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpDashboardComponent} from './dashboard/sp-dashboard/sp-dashboard.component'

import { SpTypeComponent } from './pages/sp-type/sp-type.component';
import { SpSpecializationComponent } from './pages/sp-specialization/sp-specialization.component';
import { SpDetailComponent } from './pages/sp-detail/sp-detail.component';
import { SpPetServiceAppointmentComponent } from './pages/sp-pet-service-appointment/sp-pet-service-appointment.component';
import { SpDetailProfileComponent } from './pages/sp-detail-profile/sp-detail-profile.component';
import { SpPetServiceAppointmentViewComponent } from './pages/sp-pet-service-appointment-view/sp-pet-service-appointment-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' ,pathMatch:'full'},
  { path: 'dashboard', component: SpDashboardComponent },
  { path: 'service_provider_type_management', component: SpTypeComponent },
  { path: 'service_provider_specialization_management', component: SpSpecializationComponent },
  { path: 'service_provider_detail', component: SpDetailComponent },
  { path: 'service_provider_appointment', component: SpPetServiceAppointmentComponent },
  { path: 'service_provider_detail_view', component: SpDetailProfileComponent },
  { path: 'service_provider_appointment_view', component: SpPetServiceAppointmentViewComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceProviderRoutingModule { }
