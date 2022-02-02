import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
// import { AdminComponent } from './admin.component';
import { AdminHeaderComponent } from './component/admin-header/admin-header.component';
import { AdminSidebarComponent } from './component/admin-sidebar/admin-sidebar.component';

import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DashboardComponent } from './dashboard/dashboard.component';

import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ServiceTypeComponent } from './pages/master/service-type/service-type.component';
import { CustomerManagementComponent } from './pages/customer-management/customer-management.component';
import { VendorManagementComponent } from './pages/vendor-management/vendor-management.component';
import { ServiceProviderManagementComponent } from './pages/service-provider-management/service-provider-management.component';
import { CategoryManagementComponent } from './pages/master/category-management/category-management.component';
import { SubCategoryManagementComponent } from './pages/sub-category-management/sub-category-management.component';
import { ProductManagementComponent } from './pages/product-management/product-management.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { VendorFormComponent } from './pages/vendor-management/vendor-form/vendor-form.component';
import { ServiceProviderFormComponent } from './pages/service-provider-management/service-provider-form/service-provider-form.component';
import { CustomerFormComponent } from './pages/customer-management/customer-form/customer-form.component';
import {MultiSelectModule} from 'primeng/multiselect';
import { PetlistComponent } from './pages/customer-management/petlist/petlist.component';
import { PetCareAppointmentComponent } from './pages/pet-care-appointment/pet-care-appointment.component';
import { PetServiceAppointmentComponent } from './pages/pet-service-appointment/pet-service-appointment.component';
import {TabViewModule} from 'primeng/tabview';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HomebannerComponent } from './pages/master/homebanner/homebanner.component';
import { PetcarebannerComponent } from './pages/master/petcarebanner/petcarebanner.component';
import { PetservicebannerComponent } from './pages/master/petservicebanner/petservicebanner.component';
import { EcombannerComponent } from './pages/master/ecombanner/ecombanner.component';
import { MarketplacebannerComponent } from './pages/master/marketplacebanner/marketplacebanner.component';
import { SplashScreenComponent } from './pages/master/splash-screen/splash-screen.component';
import { LocationsComponent } from './Pages/master/locations/locations.component';
import { UserTypeComponent } from './pages/master/user-type/user-type.component';
import { DemoPageComponent } from './pages/master/demo-page/demo-page.component';
import { DocSpecializationComponent } from './pages/master/doc-specialization/doc-specialization.component';
import { DetailViewComponent } from './pages/detail-view/detail-view.component';
import { CustomerCreateComponent } from './pages/customer-management/customer-create/customer-create.component';
import { ServiceProviderSpecializationComponent } from './pages/service-provider-management/service-provider-specialization/service-provider-specialization.component';
import { ServiceproviderDetailsComponent } from './pages/serviceprovider-details/serviceprovider-details.component';
import { SpDetailViewComponent } from './pages/service-provider-management/sp-detail-view/sp-detail-view.component';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ViewVendorProductsComponent } from './pages/vendor-management/view-vendor-products/view-vendor-products.component';
import { NgOtpInputModule } from 'ng-otp-input'
import {CheckboxModule} from 'primeng/checkbox';
import { DiagnosisComponent } from './pages/master/diagnosis/diagnosis.component';
import { SubDiagnosisComponent } from './pages/master/sub-diagnosis/sub-diagnosis.component';
import { HealthissueComponent } from './pages/master/healthissue/healthissue.component';
import { MinibannerComponent } from './pages/master/minibanner/minibanner.component';
import { SpSpecComponent } from './pages/master/sp-spec/sp-spec.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';




////// Vendor Details ///////

import { VendorProductdetailComponent } from './vendor/vendor-productdetail/vendor-productdetail.component';
import { VendorAddProductdetailComponent } from './vendor/vendor-add-productdetail/vendor-add-productdetail.component';
import { VendorEditProductdetailComponent } from './vendor/vendor-edit-productdetail/vendor-edit-productdetail.component';
import { VendorListComponent } from './vendor/vendor-list/vendor-list.component';
import { VendorAddComponent } from './vendor/vendor-add/vendor-add.component';
import { VendorEditComponent } from './vendor/vendor-edit/vendor-edit.component';

import { DoctorcreateComponent } from './doctor/doctorcreate/doctorcreate.component';
import { DoctoreditComponent } from './doctor/doctoredit/doctoredit.component';
import { DoctorlistComponent } from './doctor/doctorlist/doctorlist.component';
import { DoctorappointmentComponent } from './doctor/doctor/doctorappointment/doctorappointment.component';
import { DoctorappointmentviewComponent } from './doctor/doctor/doctorappointmentview/doctorappointmentview.component';
import { ServicebannerComponent } from './pages/master/servicebanner/servicebanner.component';
import { DoctorbannerComponent } from './pages/master/doctorbanner/doctorbanner.component';
import { DoctorviewComponent } from './doctor/doctorview/doctorview.component';




@NgModule({
  declarations: [
    AdminHeaderComponent,
    AdminSidebarComponent,
    DashboardComponent,
    ServiceTypeComponent,
    CustomerManagementComponent,
    VendorManagementComponent,
    ServiceProviderManagementComponent,
    CategoryManagementComponent,
    SubCategoryManagementComponent,
    ProductManagementComponent,
    VendorFormComponent,
    ServiceProviderFormComponent,
    CustomerFormComponent,
    PetlistComponent,
   
    PetCareAppointmentComponent,
    PetServiceAppointmentComponent,

    HomebannerComponent,
    PetcarebannerComponent,
    PetservicebannerComponent,
    EcombannerComponent,
    MarketplacebannerComponent,
    SplashScreenComponent,
    LocationsComponent,
    UserTypeComponent,
    DemoPageComponent,
    DocSpecializationComponent,

    DetailViewComponent,
    CustomerCreateComponent,
    ServiceProviderSpecializationComponent,
    ServiceproviderDetailsComponent,
    SpDetailViewComponent,

    ViewVendorProductsComponent,
    DiagnosisComponent,
    SubDiagnosisComponent,
    HealthissueComponent,
    MinibannerComponent,
    SpSpecComponent,



    VendorProductdetailComponent,
    VendorAddProductdetailComponent,
    VendorEditProductdetailComponent,
    VendorListComponent,
    VendorAddComponent,
    VendorEditComponent,

    DoctorappointmentComponent,
    DoctorcreateComponent,
    DoctorappointmentviewComponent,
    DoctoreditComponent,
    DoctorlistComponent,
    ServicebannerComponent,
    DoctorbannerComponent,
    DoctorviewComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
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
    AutocompleteLibModule,
    Ng2SearchPipeModule,
    TableModule,
    FileUploadModule,
    TooltipModule,
    MultiSelectModule,
    TabViewModule,
    NgOtpInputModule,
    CheckboxModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDap8qav1flUsql0VWUYkjgB0noN0o_U1Y'
    }),
    GooglePlaceModule,
    FilterPipeModule,
    ReactiveFormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [
    DatePipe
  ],
  exports: [
    AdminHeaderComponent,
    AdminSidebarComponent
  ]
})
export class AdminModule { }
