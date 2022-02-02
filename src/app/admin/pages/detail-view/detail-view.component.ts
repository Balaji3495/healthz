import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ApiService } from '../../../api.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {
  view_detail: any;
  view_detail_data: any;
  live_s: any;
  user_id: any;

  doctor_details: any;
  preview_doctor_Details: any;


  doctor_clinic_pic: any;
  previous_doctor_clinic_pic: any;
  doctor_education_details: any;
  previous_doctor_education_details: any;
  doctor_spec_details: any;
  previous_doctor_spec_details: any;

  doctor_pet_handle_details: any;
  previous_doctor_pet_handle_details: any;

  doctor_experience_details: any;
  previous_doctor_experience_details: any;
  constructor(
    private toastr: ToastrManager,
    private location: Location,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private _api: ApiService,
  ) {
    this.view_detail = this.getFromLocal('view_detail');
    this.view_detail_data = this.getFromLocal('view_detail_data');
    this.doctor_details = this.view_detail_data;
    if (this.view_detail == 'Doctor') {
      this.user_id = this.view_detail_data.user_id._id

    }



  }

  ngOnInit(): void {
    if (this.view_detail == 'Doctor') {
      let id = {
        "user_id": this.user_id
      }
      console.log(id)
      this._api.live_check(id).subscribe(
        (response: any) => {
          console.log(response);
          this.preview_doctor_Details = response.Data[0];
          console.log(this.doctor_details);
          console.log(this.preview_doctor_Details);


          ///Comparing Array/////
          this.doctor_clinic_pic = JSON.stringify(this.doctor_details.clinic_pic);
          this.previous_doctor_clinic_pic = JSON.stringify(this.preview_doctor_Details.clinic_pic);
          this.doctor_education_details = JSON.stringify(this.doctor_details.education_details);
          this.previous_doctor_education_details = JSON.stringify(this.preview_doctor_Details.education_details);
          this.doctor_spec_details = JSON.stringify(this.doctor_details.specialization);
          this.previous_doctor_spec_details = JSON.stringify(this.preview_doctor_Details.specialization)
          this.doctor_pet_handle_details = JSON.stringify(this.doctor_details.pet_handled);
          this.previous_doctor_pet_handle_details = JSON.stringify(this.preview_doctor_Details.pet_handled);
          this.doctor_experience_details= JSON.stringify(this.doctor_details.experience_details);
          this.previous_doctor_experience_details= JSON.stringify(this.preview_doctor_Details.experience_details);


          console.log(this.doctor_experience_details);
          console.log(this.previous_doctor_experience_details);
        }
      );

    }

  }



  back() {
    this.location.back();
  }
  goToLink1(url: string) {
    window.open(url, "_blank");
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }

  verify(status, id) {
    let a = {
      '_id': id,
      'profile_verification_status': status,
    };
    this._api.doctor_details_edit1(a).subscribe(
      (response: any) => {
        console.log(response.Data);
        this.view_detail_data = response.Data;
        this.user_id = this.view_detail_data.user_id
        // alert("Updated Successfully");
        this.showSuccess("Updated Successfully");
        this.ngOnInit();
      }
    );
  }


  live_status_change(status, id) {
    let a = {
      '_id': id,
      "live_by": "Super Admin",
      "live_status": status
    };
    this._api.doctor_details_edit(a).subscribe(
      (response: any) => {
        console.log(response.Data);
        // alert("Updated Successfully");
        this.showSuccess("Updated Successfully");
        if (this.live_s == 'not_live') {
          this.view_detail_data = response.Data;
          this.user_id = this.view_detail_data.user_id
          let a = response.Data;
          console.log(a);
          this._api.livedoctordetails_create(a).subscribe(
            (response: any) => {
              console.log(response);
              this.ngOnInit();
            }
          );
        }
        else {
          this.view_detail_data = response.Data;
          this.user_id = this.view_detail_data.user_id
          let a = response.Data;
          this._api.livedoctordetails_edit(a).subscribe(
            (response: any) => {
              console.log(response);
              this.ngOnInit();
            }
          );
        }

      }
    );

  }

  delete_pet(data) {
    let a = {
      '_id': data
    };
    console.log(a);
    this._api.pet_detail_delete(a).subscribe(
      (response: any) => {
        console.log(response.Data);
        // alert('Deleted Successfully');
        this.showSuccess("Deleted Successfully");
        let b = {
          'user_id': this.view_detail_data.userdetailsModels[0]._id
        };
        console.log(b);
        this._api.single_user_detail(b).subscribe(
          (response: any) => {
            console.log(response.Data);
            this.view_detail_data = response.Data;
            console.log(this.view_detail_data);
          }
        );
      }
    );
  }
  delete_loc(data) {
    let a = {
      '_id': data
    };
    console.log(a);
    this._api.customer_location_delete(a).subscribe(
      (response: any) => {
        console.log(response.Data);
        // alert('Deleted Successfully');
        this.showSuccess("Deleted Successfully");
        let b = {
          'user_id': this.view_detail_data.userdetailsModels[0]._id
        };
        console.log(b);
        this._api.single_user_detail(b).subscribe(
          (response: any) => {
            console.log(response.Data);
            this.view_detail_data = response.Data;
            console.log(this.view_detail_data);
          }
        );
      }
    );
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

  makelive(){
    console.log(this.doctor_details);
    console.log(this.preview_doctor_Details);
    // makelivedoctor
    let b = {

    };
    console.log(b);
    this._api.makelivedoctor(b).subscribe(
      (response: any) => {

      }
    );





  }
}
