import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ApiService } from '../../../api.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-sp-detail-profile',
  templateUrl: './sp-detail-profile.component.html',
  styleUrls: ['./sp-detail-profile.component.css']
})
export class SpDetailProfileComponent implements OnInit {
  view_detail: any;
  view_detail_data: any;
  live_s: any;
  constructor(
    private toastr:ToastrManager,
    private location: Location,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private _api: ApiService,
  ) { 
    this.view_detail = this.getFromLocal('view_detail');
    this.view_detail_data = this.getFromLocal('view_detail_data');
    console.log(this.view_detail);
    console.log(this.view_detail_data)
  }

  ngOnInit(): void {
    let id = {
      "user_id": this.view_detail_data._id
    }
    console.log(id)
    this._api.live_check(id).subscribe(
      (response: any) => {
        console.log(response);
        if (response.Data.length == 0) {
          this.live_s = 'not_live';
        }
        else {
          this.live_s = 'live';
        }
        console.log( this.live_s);
      }
    );
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
    this._api.doctor_details_edit(a).subscribe(
      (response: any) => {
        console.log(response.Data);
        //alert("Updated Successfully");
        this.showSuccess("Updated Successfully")
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
        //alert("Updated Successfully");
        this.showSuccess("Updated Successfully")
        this.view_detail_data = response.Data;
        if (this.live_s == 'not_live') {
          let a = response.Data;
          this._api.livedoctordetails_create(a).subscribe(
            (response: any) => {
              console.log(response);
            }
          );
        }
        else {
          let a = response.Data;
          this._api.livedoctordetails_edit(a).subscribe(
            (response: any) => {
              console.log(response);
            }
          );
        }
        this.ngOnInit();
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
        //alert('Updated Successfully');
        this.showSuccess("Updated Successfully")
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
        //alert('Deleted Successfully');
        this.showSuccess("Deleted Successfully")
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
}

