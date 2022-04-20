import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AdminModule } from './admin/admin.module';
import { AdminComponent } from './admin/admin.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HomepageModule } from './homepage/homepage.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { AgmCoreModule } from '@agm/core';
import { PetServiceAppointmentViewComponent } from './pet-service-appointment-view/pet-service-appointment-view.component';
import { MatStepperModule } from '@angular/material/stepper';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { ServiceProviderModule } from './service-provider/service-provider.module';
import { ServiceProviderComponent } from './service-provider/service-provider.component';
import { NgOtpInputModule } from 'ng-otp-input';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { isEllipsisActiveDirective } from './provider/directive/is-ellipsis-active.directive';




@NgModule({
  declarations: [
    // IsEllipsDirectiveDirective,
    AppComponent,
    AdminComponent,
    HomepageComponent,
    LoginComponent,
    PetServiceAppointmentViewComponent,
    ServiceProviderComponent,
    isEllipsisActiveDirective,
  

  ],
  imports: [
    BrowserModule,
    AutocompleteLibModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    AdminModule,
    HomepageModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    
    RadioButtonModule, TableModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDap8qav1flUsql0VWUYkjgB0noN0o_U1Y'
    }),
    GooglePlaceModule,
    MatStepperModule,
    CalendarModule,
    MultiSelectModule,
    MatStepperModule,
    ServiceProviderModule,
    NgOtpInputModule,
    DialogModule,
    ButtonModule,

  ],
  // exports: [IsEllipsDirectiveDirective],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
