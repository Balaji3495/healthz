import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ApiService } from '../../../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../../environments/environment';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-service-type',
  templateUrl: './service-type.component.html',
  styleUrls: ['./service-type.component.css']
})
export class ServiceTypeComponent implements OnInit {
  apiUrl = environment.apiUrl;
  imgUrl = environment.imageURL;
  rows = [];
  searchQR: any;
  Tittle: any;
  subtitle : any;
  banner_img : any= 'http://13.57.9.246:3000/api/uploads/banner_empty.jpg';
  Description: any;
  selectedtype: any;
  type: any = [];
  S_Date: any;
  E_Date: any;
  Validation: any;
  selectedimgae: any;
  img_path: string = undefined;
  list: any;
  id: any;
  edit_t: boolean = false;
  @ViewChild('imgType', { static: false }) imgType: ElementRef;
  constructor(
    private toastr:ToastrManager,
    private router: Router,
    private location: Location,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private _api: ApiService,
    private http: HttpClient,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.listpettype();
  }
  listpettype() {
    console.log("list");
    this._api.SP_services_list().subscribe(
      (response: any) => {
        console.log(response.Data);
        this.list = response.Data;
      }
    );
  }
  validation() {
    if (this.Tittle == undefined || this.Tittle == '' || this.img_path == undefined) {
      this.Validation = false;
      console.log(this.Validation)
    }
    else {
      this.Validation = true;
      console.log(this.Validation)
    }
  }


  create() {
    this.validation();
    if (this.Validation == false) {
      //alert("Please enter valid inputs");
      this.showWarning("Please enter valid inputs");
    } else {
      let a = {
        "img_path": this.img_path,
        "img_title": this.Tittle,
        "img_subtitle" : this.subtitle,
        "img_banner" : this.banner_img,
        "img_describ": this.Description,
        "img_index": 4,
        "show_status": true,
        "date_and_time": "" + new Date(),

      }
      console.log(a);
      this._api.SP_services_create(a).subscribe(
        (response: any) => {
          console.log(response);
          if (response.Code === 200) {
            //alert('Added Successfully');
            this.showSuccess("Added Successfully")
            this.ngOnInit();
          } else {
            //alert(response.Message);
            this.showError(response.Message)
          }
        }
      );
    }
  }
  //////Additional Calling Funcation//////
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
        // if (width == 80 && height == 80) {
        //   let d = this.selectedimgae.size / 100000;
        //   if (d < 10) {
        //     this.addfiles1();
        //   } else {
        //     //alert('Please upload the file below 1 MB');
        //     this.showWarning("Please upload the file below 64 KB");
        //     this.imgType.nativeElement.value = "";
        //   }
        // }
        // else {
        //   //alert('Please upload the file size 100 * 100');
        //   this.showWarning("Please upload the file size 200 * 200");
        //   this.imgType.nativeElement.value = "";
        // }
        this.addfiles1();
      };
      img.src = fr.result as string; // The data URL
    };
    fr.readAsDataURL(this.selectedimgae);
    // clear the value after upload
  }


  fileupload1(event) {
    console.log("this.width");
    this.selectedimgae = event.target.files[0];
    console.log(this.selectedimgae.size / 100000);
    let fr = new FileReader();
    fr.onload = () => { // when file has loaded
      var img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        console.log(width, height);
        // if (width ==  350 && height == 800) {
        //   let d = this.selectedimgae.size / 100000;
        //   if (d < 10) {
        //     this.addfiles2();
        //   } else {
        //     //alert('Please upload the file below 1 MB');
        //     this.showWarning("Please upload the file below 400 KB")
        //     this.imgType.nativeElement.value = "";
        //   }
        // }
        // else {
        //   //alert('Please upload the file size 100 * 100');
        //   this.showWarning("Please upload the file size 800 * 350")
        //   this.imgType.nativeElement.value = "";
        // }
        this.addfiles2();
      };
      img.src = fr.result as string; // The data URL
    };
    fr.readAsDataURL(this.selectedimgae);
    // clear the value after upload
  }

  addfiles2() {
    const fd = new FormData();
    fd.append('sampleFile', this.selectedimgae, this.selectedimgae.name);
    this.http.post(this.imgUrl , fd)
      .subscribe((res: any) => {
        console.log(res);
        this.banner_img = res.Data;
      });
  }


  addfiles1() {
    const fd = new FormData();
    fd.append('sampleFile', this.selectedimgae, this.selectedimgae.name);
    this.http.post(this.imgUrl , fd)
      .subscribe((res: any) => {
        console.log(res);
        this.img_path = res.Data;
      });
  }


  delete(data) {
    let a = {
      '_id': data
    };
    console.log(a);
    this._api.SP_services_delete(a).subscribe(
      (response: any) => {
        console.log(response.Data);
        //alert('Deleted Successfully');
        this.showSuccess("Deleted Successfully");
        this.ngOnInit();
      }
    );
  }
  edit(item) {
    console.log(item)
    this.edit_t = true;
    this.id = item._id;
    this.img_path = item.img_path;
    this.Tittle = item.img_title;
    this.Description = item.img_describ;
    this.banner_img =  item.img_banner;
  }
  update() {
    if (this.Validation == false) {
      //alert("Please enter valid inputs");
      this.showWarning("Please enter valid inputs");
    } else {
      let a = {
        "_id": this.id,
        "img_path": this.img_path,
        "img_title": this.Tittle,
        "img_subtitle" : this.subtitle,
        "img_banner" : this.banner_img,
        "img_describ": this.Description,
        "img_index": 4,
        "show_status": true,
        "date_and_time": "" + new Date(),

      }
      console.log(a);
      this._api.SP_services_edit(a).subscribe(
        (response: any) => {
          console.log(response);
          if (response.Code === 200) {
            //alert('Update Successfully');
            this.showSuccess("Update Successfully")
            this.ngOnInit();
            this.edit_t = false;
            this.id = undefined;
            this.img_path = undefined;
            this.Tittle = undefined;
            this.Description = undefined;
          } else {
            //alert(response.Message);
            this.showError(response.Message)
          }
        }
      );
    }
  }

  filter_date() {
    if (this.E_Date != undefined && this.S_Date != undefined) {
      // let yourDate = new Date(this.E_Date.getTime() + (1000 * 60 * 60 * 24));
      let yourDate = this.E_Date.setDate(this.E_Date.getDate() + 1);

      let a = {
        "fromdate": this.datePipe.transform(new Date(this.S_Date), 'yyyy-MM-dd'),
        "todate": this.datePipe.transform(new Date(yourDate), 'yyyy-MM-dd')
      }
      console.log(a);
      this._api.SP_services_filter_date(a).subscribe(
        (response: any) => {
          console.log(response.Data);
          this.list = response.Data;
        }
      );
    }
    else {
      this.showWarning("Please select the startdate and enddate");
      //alert('Please select the startdate and enddate');
    }

  }
  refersh() {
    this.listpettype(); this.E_Date = undefined; this.S_Date = undefined;
  }
  cancel() {
    this.edit_t = true;
    this.img_path = undefined;
    this.Tittle = undefined;
    this.Description = undefined;
    this.banner_img =  undefined;
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
