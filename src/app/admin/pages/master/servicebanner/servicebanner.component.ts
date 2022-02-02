import { Component, OnInit, Inject, ViewChild, AfterViewInit, ElementRef } from '@angular/core'; import { Router } from '@angular/router';
import { ApiService } from '../../../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../../environments/environment';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-servicebanner',
  templateUrl: './servicebanner.component.html',
  styleUrls: ['./servicebanner.component.css']
})
export class ServicebannerComponent implements OnInit {
  apiUrl = environment.apiUrl;
  imgUrl = environment.imageURL;
  rows = [];
  searchQR: any;
  value1: any;
  S_Date: any;
  E_Date: any;
  img_index: number = 0;
  show_status: boolean = true;
  img_title: string = '';
  img_describ: string = '';
  img_path: string = 'http://13.57.9.246:3000/api/uploads/banner_empty.jpg';
  date_and_time: string = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  user_type_list: any = [];
  user_type_id: string = '';

  update_button: boolean;
  selectedimgae: any;

  @ViewChild('imgType', { static: false }) imgType: ElementRef;

  constructor(
    private toastr:ToastrManager,
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private http: HttpClient,
    private _api: ApiService,
    private routes: ActivatedRoute,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.img_index = 0;
    this.show_status = true;
    this.img_title = '';
    this.img_describ = '';
    this.img_path = 'http://13.57.9.246:3000/api/uploads/banner_empty.jpg';
    this.update_button = true;
    this.listservicebanner();
  }



  listservicebanner() {
    this._api.servicebanner_list().subscribe(
      (response: any) => {
        console.log(response.Data);
        this.rows = response.Data;
        this.user_type_list = response.Data;
        console.log(this.user_type_list);
      }
    );
  }

  cancel() {
    this.update_button = true;
    this.img_path = undefined;
  }

  ////// Inserting Data

  Insert_servicebanner_details() {
    if (this.img_path == '') {
      // alert("Please upload the image");
      this.showWarning("Please upload the image");
    }
    else {
      let a = {
        'img_path': this.img_path,
        'img_title': this.img_title,
        'img_describ': this.img_describ,
        'img_index': this.img_index,
        'show_status': this.show_status,
        'date_and_time': new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
      };
      console.log(a);
      this._api.servicebanner_insert(a).subscribe(
        (response: any) => {
          console.log(response.Data);
          if (response.Code === 200) {
            // alert('Added Successfully');
            this.showSuccess("Added Successfully")
          } else {
            this.showError(response.Message)
            // alert(response.Message);
          }
          this.ngOnInit();
        }
      );
    }
  }


  Edit_user_type_details() {

    if (this.img_path == '') {
      // alert("Please enter the user type");
      this.showWarning("Please enter the user type");
    } else {
      let a = {
        '_id': this.user_type_id,
        'img_path': this.img_path,
        'img_title': this.img_title,
        'img_describ': this.img_describ,
        'img_index': this.img_index,
        'show_status': this.show_status,
        'date_and_time': new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      };
      this._api.servicebanner_edit(a).subscribe(
        (response: any) => {
          console.log(response.Data);
          //alert("Updated Successfully");
          this.showSuccess("Updated Successfully");
          this.ngOnInit();
        }
      );
    }






  }



  Deletecompanydetails(data) {
    let a = {
      '_id': data
    };
    console.log(a);
    this._api.servicebanner_delete(a).subscribe(
      (response: any) => {
        console.log(response.Data);
        // alert('Deleted Successfully');
        this.showSuccess("Deleted Successfully")
        this.ngOnInit();
      }
    );
  }


  Editcompanydetailsdata(data) {
    this.update_button = false;
    this.user_type_id = data._id;
    this.img_path = data.img_path;
    this.img_title = data.img_title;
    this.img_describ = data.img_describ;
    this.img_index = data.img_index;
    this.show_status = data.show_status;
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
        // if (width == 800 && height == 350) {
        //   let d = this.selectedimgae.size / 100000;
        //   if (d < 10) {
        //     this.addfiles1();
        //   } else {
        //     // alert('Please upload the file below 1 MB');
        //     this.showWarning("Please upload the file below 400 KB");
        //     this.imgType.nativeElement.value = "";
        //   }
        // }
        // else {
        //   // alert('Please upload the file size 400 * 800');
        //   this.showWarning("Please upload the file size 800 * 350");
        //   this.imgType.nativeElement.value = "";
        // }
        this.addfiles1();
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
        this.img_path = res.Data;
      });
  }


  filter_date() {
    if ( this.E_Date != undefined && this.S_Date != undefined) {
      // let yourDate = new Date(this.E_Date.getTime() + (1000 * 60 * 60 * 24));
      let yourDate= this.E_Date.setDate(this.E_Date.getDate() + 1);

      let a = {
        "fromdate":this.datePipe.transform(new Date(this.S_Date),'yyyy-MM-dd'),
        "todate" : this.datePipe.transform(new Date(yourDate),'yyyy-MM-dd')
        }
      console.log(a);
      this._api.servicebanner_filter_date(a).subscribe(
        (response: any) => {
          console.log(response.Data);
          this.rows = response.Data;
        }
      );
    }
    else{
      // alert('Please select the startdate and enddate');
      this.showWarning("Please select the startdate and enddate")
    }

  }
  refersh(){
    this.listservicebanner();this.E_Date = undefined ; this.S_Date = undefined;
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
