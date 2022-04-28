import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MouseEvent } from '@agm/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.css']
})
export class VendorFormComponent implements OnInit {
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;

  Latitude: any;
  Longitude: any;
  address: any;
  zoom: number = 8;
  base_lat: number = 11.1271;
  base_lng: number = 78.6569;
  location_lat: number = 11.1271;
  location_lng: number = 78.6569;
  addVendorForm: FormGroup;
  userForm: FormGroup;
  addmore: boolean;
    
  public handleAddressChange(address: any) {
    this.zoom = 15;
    this.location_lat = Number(address.geometry.location.lat());
    this.location_lng = Number(address.geometry.location.lng());
    this.base_lat = this.location_lat;
    this.base_lng = this.location_lng;
    this.Latitude = this.location_lat;
    this.Longitude = this.location_lng;
    this.address = address.formatted_address;
    this.addVendorForm.patchValue({
      bussiness_lat:this.location_lat,
      bussiness_long:this.location_lng
    });
    console.log(this.address);
  }

  options={
    types: [],
    componentRestrictions: { country: 'IN' }
    }
  Name:any;
  email:any;
  Contact:any;
  registration:any;
  uploadedFiles: any[] = [];
  constructor(private router: Router, private _api:ApiService, private formBuilder:FormBuilder, private toastr:ToastrManager) {
    this.addVendorForm = this.formBuilder.group({



      // _id:[''],
      business_reg:['',Validators.required],
      bussiness:['',Validators.required],
      bussiness_email:['',Validators.required],
      bussiness_gallery:[''],
      bussiness_lat:[''],
      bussiness_loc:[''],
      bussiness_long:[''],
      bussiness_name:['',Validators.required],
      bussiness_phone:['',Validators.required],
      certifi:[''],
      date_and_time:[''],
      // delete_status:[''],
      govt_id_proof:[''],
      mobile_type:['Admin'],
      photo_id_proof:[''],
      profile_status:[true],
      profile_verification_status:['Verified'],
      user_email:[''],
      user_id:[''],
      user_name:['']
    });
    this.userForm = this.formBuilder.group({
      first_name:['',Validators.required],
      last_name:['',Validators.required],
      mobile_type:['',Validators.required],
      user_email:['',Validators.required],
      user_email_verification:['',Validators.required],
      user_phone:['',Validators.required],
      user_type:['',Validators.required],
      user_status:[''],
      ref_code:['']
      
    });
   }

  ngOnInit(): void {
    this.addmore = false;
  }
  cancel() {
    this.router.navigateByUrl('/admin_panel/Vendor_Management')
  }
  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      console.log(this.uploadedFiles)
    }

  }

  markerDragEnd($event: MouseEvent) {
    this.location_lat = Number($event.coords.lat);
    this.location_lng = Number($event.coords.lng);
    this.base_lat = this.location_lat;
    this.base_lng = this.location_lng;
    this.Latitude = this.location_lat;
    this.Longitude = this.location_lng;
    this.addVendorForm.patchValue({
       bussiness_lat:this.location_lat,
      bussiness_long:this.location_lng
    });
    this._api.location_details(this.location_lat,this.location_lng).subscribe(async data=>{
      this.address = await data['results'][0]['formatted_address'];
    });
  }

  addUser(){
    this.userForm.patchValue({
      user_email_verification: false,
      user_type:3,
      mobile_type:"admin",
      user_status: "complete",
        ref_code: ""
    });
    
    if (this.userForm.valid) {
      this._api.user_create(this.userForm.value).subscribe(data=>{
        console.log("sss",data)
        if (data['Code']==200) {
          this.addmore = true;
          this.addVendorForm.patchValue({
            user_email:data['Data']['user_details']['user_email'],
            user_id:data['Data']['user_details']['_id'],
            user_name:data['Data']['user_details']['first_name']
          })
          this.showSuccess(data['Message']);
        } else {
          this.showError(data['Message']);
          this.addmore = false;
        }
      })
    } else {
      this.showError("Please all fields");
    }
  }

  addVendor(){
    console.log("sample",this.addVendorForm.value);
    if (this.addVendorForm.valid) {

      this._api.create_Vendor(this.addVendorForm.value).subscribe(data=>{
        console.log("test",data)
        if (data['Code']==200) {
          this.showSuccess(data['Message']);
          this.router.navigateByUrl('/admin/Agents');
        } else {
          this.showError(data['Message']);
        }
      });
    } else {
    
      this.showError("Please all fields");
    }
  }


  updateVendor(){

  }

  showSuccess(msg) {
    this.toastr.successToastr(msg);
  }

  showError(msg) {
    this.toastr.errorToastr(msg);
  }

  showWarning(msg) {
    this.toastr.warningToastr(msg);
  }

}
