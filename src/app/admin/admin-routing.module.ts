import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServiceTypeComponent } from './pages/master/service-type/service-type.component';
import { CustomerManagementComponent } from './pages/customer-management/customer-management.component';
import { VendorManagementComponent } from './pages/vendor-management/vendor-management.component';
import { ServiceProviderManagementComponent } from './pages/service-provider-management/service-provider-management.component';
import { CategoryManagementComponent } from './pages/master/category-management/category-management.component';
import { SubCategoryManagementComponent } from './pages/sub-category-management/sub-category-management.component';
import { ProductManagementComponent } from './pages/product-management/product-management.component';
import { OrderDetailsComponent} from './pages/order-details/order-details.component';


import { VendorFormComponent } from './pages/vendor-management/vendor-form/vendor-form.component';
import { ServiceProviderFormComponent } from './pages/service-provider-management/service-provider-form/service-provider-form.component';
import { CustomerFormComponent } from './pages/customer-management/customer-form/customer-form.component';
import { PetlistComponent } from './pages/customer-management/petlist/petlist.component';
import { PetCareAppointmentComponent } from './pages/pet-care-appointment/pet-care-appointment.component';
import { PetServiceAppointmentComponent } from './pages/pet-service-appointment/pet-service-appointment.component';


///Banner//
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
import { PetServiceAppointmentViewComponent } from '../pet-service-appointment-view/pet-service-appointment-view.component';

import { ViewVendorProductsComponent } from './pages/vendor-management/view-vendor-products/view-vendor-products.component';

import { DiagnosisComponent } from './pages/master/diagnosis/diagnosis.component';
import { SubDiagnosisComponent } from './pages/master/sub-diagnosis/sub-diagnosis.component';

import { HealthissueComponent } from './pages/master/healthissue/healthissue.component';
import { MinibannerComponent } from './pages/master/minibanner/minibanner.component';

import { SpSpecializationComponent } from '../service-provider/pages/sp-specialization/sp-specialization.component';
import { SpSpecComponent } from './pages/master/sp-spec/sp-spec.component';



//// Vendor Details /////

import { VendorEditComponent } from './vendor/vendor-edit/vendor-edit.component';
import { VendorListComponent } from './vendor/vendor-list/vendor-list.component';
import { VendorAddComponent } from './vendor/vendor-add/vendor-add.component';
import { VendorEditProductdetailComponent } from './vendor/vendor-edit-productdetail/vendor-edit-productdetail.component';
import { VendorAddProductdetailComponent } from './vendor/vendor-add-productdetail/vendor-add-productdetail.component';
import { VendorProductdetailComponent } from './vendor/vendor-productdetail/vendor-productdetail.component';

import { DoctorcreateComponent } from './doctor/doctorcreate/doctorcreate.component';
import { DoctorlistComponent } from './doctor/doctorlist/doctorlist.component';
import { DoctoreditComponent } from './doctor/doctoredit/doctoredit.component';
import { DoctorappointmentComponent } from './doctor/doctor/doctorappointment/doctorappointment.component';
import { DoctorappointmentviewComponent } from './doctor/doctor/doctorappointmentview/doctorappointmentview.component';
import { ServicebannerComponent } from './pages/master/servicebanner/servicebanner.component';
import { DoctorbannerComponent } from './pages/master/doctorbanner/doctorbanner.component';
import { DoctorviewComponent } from './doctor/doctorview/doctorview.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/:name', component: DashboardComponent },
  { path: 'healthissue', component: HealthissueComponent },
  { path: 'Service_Type', component: ServiceTypeComponent },
  { path: 'Customer_Management', component: CustomerManagementComponent },
  { path: 'Agents', component: VendorManagementComponent },
  { path: 'Service_Provider_Management', component: ServiceProviderManagementComponent },
  { path: 'Category_Management', component: CategoryManagementComponent },
  { path: 'Sub_Category_Management', component: SubCategoryManagementComponent },
  { path: 'Product_Management', component: ProductManagementComponent },
  { path: 'Order_Details', component: OrderDetailsComponent },

  { path: 'Vendor_form', component: VendorFormComponent },
  { path: 'Service_Provider_form', component: ServiceProviderFormComponent },
  { path: 'Customer_form', component: CustomerFormComponent },
  { path: 'Pet_list', component: PetlistComponent },
  { path: 'doctor_appointment', component: PetCareAppointmentComponent },
  { path: 'Service_appointment', component: PetServiceAppointmentComponent },
  { path: 'View_Service_appointment', component: PetServiceAppointmentViewComponent },

  { path: 'serviceprovider_details', component: ServiceproviderDetailsComponent },


  { path: 'view-vendor-products', component: ViewVendorProductsComponent },

  ///DOCTOR///



  ///Master ////
  /////////Banners//////
  { path: 'master/banner/homebanner', component: HomebannerComponent },
  { path: 'master/banner/servicebanner', component: ServicebannerComponent },
  { path: 'master/banner/doctorbanner', component: DoctorbannerComponent },
  { path: 'master/banner/minibanner', component: MinibannerComponent },
  { path: 'master/banner/petcarebanner', component: PetcarebannerComponent },
  { path: 'master/banner/petservicebanner', component: PetservicebannerComponent },
  { path: 'master/banner/ecombanner', component: EcombannerComponent },
  { path: 'master/banner/marketplacebanner', component: MarketplacebannerComponent },
  { path: 'master/banner/splashscreen', component: SplashScreenComponent },
  { path: 'master/locations/addlocation', component: LocationsComponent },
  { path: 'master/sp/specialization', component: SpSpecComponent },
  { path: 'minibanner', component: MinibannerComponent },
  { path: 'user_type', component: UserTypeComponent },
  { path: 'demo_page', component: DemoPageComponent },
  { path: 'doc_specialization', component: DocSpecializationComponent },
  { path: 'View_details', component: DetailViewComponent },
  { path: 'Customer_create', component: CustomerCreateComponent },
  { path: 'Service_provider_specialization', component: ServiceProviderSpecializationComponent },
  { path: 'Sp_View_details', component: SpDetailViewComponent },
  { path: 'Diagnosis', component: DiagnosisComponent },
  { path: 'Sub_diagnosis', component: SubDiagnosisComponent },



  ///Vendor Details///
  { path: 'vendor/vendor_productdetail', component: VendorProductdetailComponent},
  { path: 'vendor/vendor_add_productdetail', component: VendorAddProductdetailComponent},
  { path: 'vendor/vendor_edit_productdetail', component: VendorEditProductdetailComponent},
  { path: 'vendor/vendor_add', component: VendorAddComponent},
  { path: 'vendor/vendor_list', component: VendorListComponent},
  { path: 'vendor/vendor_edit', component: VendorEditComponent},
  

   ///Doctor Details///
   { path: 'doctor/vendor_appointment', component: DoctorappointmentComponent},
   { path: 'doctor/vendor_appointment_view', component: DoctorappointmentviewComponent},
   { path: 'doctor/doctor_create', component: DoctorcreateComponent},
   { path: 'doctor/doctor_list', component: DoctorlistComponent},
   { path: 'doctor/doctor_edit', component: DoctoreditComponent},
   { path: 'doctor/doctor_view', component: DoctorviewComponent},
   




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
