import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ApiService } from '../../../../api.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-sp-detail-view',
  templateUrl: './sp-detail-view.component.html',
  styleUrls: ['./sp-detail-view.component.css']
})
export class SpDetailViewComponent implements OnInit {
  view_detail: any;
  view_detail_data: any;
  live_s: any;
  thumbnail_image : any;
  img_path : any;
  // imgUrl : any;
  selectedimgae : any;
  apiUrl = environment.apiUrl;
  imgUrl = environment.imageURL;


  @ViewChild('imgType', { static: false }) imgType: ElementRef;

  constructor(
    private toastr:ToastrManager,
    private location: Location,
    private http: HttpClient,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private _api: ApiService,
  ) {
    this.view_detail = this.getFromLocal('view_detail');
    this.view_detail_data = this.getFromLocal('view_detail_data');
    console.log(this.view_detail);
    console.log(this.view_detail_data)
  }

  ngOnInit(): void {
    this.thumbnail_image = this.view_detail_data.thumbnail_image;
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

  fileupload(event) {
    console.log("this.width")
    this.selectedimgae = event.target.files[0];
    console.log(this.selectedimgae.size / 100000);
    let fr = new FileReader();
    fr.onload = () => { // when file has loaded
      var img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        console.log(width, height);
        if (width == 200 && height == 200) {
          let d = this.selectedimgae.size / 100000;
          if (d < 10) {
            this.addfiles1();
          } else {
            //alert('Please upload the file below 1 MB');
            this.showWarning("Please upload the file below 1 MB");
            this.imgType.nativeElement.value = "";
          }
        }
        else {
          this.showWarning("Please upload the file size 200 * 200");
          // alert('Please upload the file size 100 * 100');
          this.imgType.nativeElement.value = "";
        }
      };
      img.src = fr.result as string; // The data URL
    };
    fr.readAsDataURL(this.selectedimgae);
    // clear the value after upload
  }


  addfiles1() {
    const fd = new FormData();
    fd.append('sampleFile', this.selectedimgae, this.selectedimgae.name);
    this.http.post(this.imgUrl , fd)
      .subscribe((res: any) => {
        console.log(res);
        this.thumbnail_image = res.Data;
        // this.imgType.nativeElement.value = "";
      });
  }


  update(){
    let a = {
      '_id': this.view_detail_data._id,
      'thumbnail_image': this.thumbnail_image,
    };
    console.log(a);
    this._api.service_provider_edit(a).subscribe(
      (response: any) => {
        console.log(response.Data);
        //alert("Updated Successfully");
        this.showSuccess("Updated Successfully")
        this.ngOnInit();
      }
    );
  }


}

