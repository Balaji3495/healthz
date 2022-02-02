import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceProviderRoutingModule } from './service-provider-routing.module';

import{ SpHeaderComponent} from './component/sp-header/sp-header.component';
import {SpSidebarComponent} from './component/sp-sidebar/sp-sidebar.component';
import {SpDashboardComponent}from './dashboard/sp-dashboard/sp-dashboard.component';

import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';




import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { DatePipe } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import {MultiSelectModule} from 'primeng/multiselect';
import {TabViewModule} from 'primeng/tabview';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { SpTypeComponent } from './pages/sp-type/sp-type.component';
import { SpSpecializationComponent } from './pages/sp-specialization/sp-specialization.component';
import { SpDetailComponent } from './pages/sp-detail/sp-detail.component';
import { SpPetServiceAppointmentComponent } from './pages/sp-pet-service-appointment/sp-pet-service-appointment.component';
import { SpPetServiceAppointmentViewComponent } from './pages/sp-pet-service-appointment-view/sp-pet-service-appointment-view.component';
import { SpDetailProfileComponent } from './pages/sp-detail-profile/sp-detail-profile.component';
@NgModule({
  declarations: [
    SpHeaderComponent,
    SpSidebarComponent,
    SpDashboardComponent,
    SpTypeComponent,
    SpSpecializationComponent,
    SpDetailComponent,
    SpPetServiceAppointmentComponent,
    SpPetServiceAppointmentViewComponent,
    SpDetailProfileComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    CommonModule,
    ServiceProviderRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    FormsModule,
    MatDialogModule,
    DialogModule,
    RadioButtonModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    Ng2SearchPipeModule,
    TableModule,
    FileUploadModule,
    TooltipModule,
    MultiSelectModule,
    TabViewModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDap8qav1flUsql0VWUYkjgB0noN0o_U1Y'
    }),
    GooglePlaceModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [
    DatePipe
  ],
  exports: [
    SpHeaderComponent,
    SpSidebarComponent
  ]
})
export class ServiceProviderModule { }
