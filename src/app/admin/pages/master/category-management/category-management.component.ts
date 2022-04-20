import { Component, OnInit, Inject, ViewChild, AfterViewInit, ElementRef } from '@angular/core'; import { Router } from '@angular/router';
import { ApiService } from '../../../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../../environments/environment';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {
  apiUrl = environment.apiUrl;
  imgUrl = environment.imageURL;
  Category_name: any;
  Category_code: any;
  img_path: any = "http://13.57.9.246:3000/api/uploads/template.jpg";
  edit_t: boolean = false;
  id: any;
  Validation:any;
  rows = [];
  searchQR: any;
  value1: any;


  specialzation: string = '';
  date_and_time: string = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  pet_type_list: any = [];
  pet_type_id: string = '';

  update_button: boolean;
  selectedimgae: any;
  S_Date: any;
  E_Date: any;
  @ViewChild('imgType', { static: false }) imgType: ElementRef;

  constructor(
    private toastr:ToastrManager,
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private http: HttpClient,
    private _api: ApiService,
    private routes: ActivatedRoute,
    private datePipe: DatePipe,
  ) { 
    // login_status
if(this.getFromLocal("login_status") === false)
{
  this.router.navigate(['login']);
}
  }

  ngOnInit(): void {

    this.specialzation = '';
    // this.user_type_img = 'http://13.57.9.246:3000/api/uploads/template.jpg';
    this.pet_type_id = '';
    this.update_button = true;
    this.listpettype();
  }
  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }

  cancel() {
    this.edit_t = false;
    this.img_path= "http://13.57.9.246:3000/api/uploads/template.jpg";
    this.Category_name= undefined;
  }
  listpettype() {
    this._api.product_cate_list().subscribe(
      (response: any) => {
        console.log(response.Data);
        this.rows = response.Data;
        this.pet_type_list = response.Data;
        console.log(this.pet_type_list);
      }
    );
  }



  ////// Inserting Data

  create() {

    if ( this.Category_name == '' || this.Category_name == undefined || this.img_path == undefined) {
      //alert("Please enter the pet type");
      this.showWarning("Please enter the pet type")
    } else {
      let a = {
        "img_path": this.img_path,
        "product_cate": this.Category_name,
        "img_index": 0,
        "show_status": true,
        "date_and_time": new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
        "delete_status": true,
      };
      console.log(a);
      this._api.product_cate_create(a).subscribe(
        (response: any) => {
          console.log(response.Data);
          if (response.Code === 200) {
            this.showSuccess('Added Successfully');
            // alert('Added Successfully');
            this.id = undefined;
            this.img_path = undefined;
            this.Category_name = undefined;
            // this.Category_code = undefined;
            this.imgType.nativeElement.value = '';
          } else {
            this.showError(response.Message);
            //alert(response.Message);
          }
          this.ngOnInit();
        }
      );
    }
  }


  delete(data) {
    let a = {
      '_id': data
    };
    console.log(a);
    this._api.product_cate_delete(a).subscribe(
      (response: any) => {
        console.log(response.Data);
        //alert('Deleted Successfully');
        this.showSuccess('Deleted Successfully');
        this.ngOnInit();
      }
    );
  }
  edit(item) {
    this.edit_t = true;
    this.id = item._id;
    this.img_path = item.img_path;
    // this.Category_code = item.img_index;
    this.Category_name = item.product_cate;
  }
  update() {
    if (this.Validation == false) {
      //alert("Please enter valid inputs");
      this.showWarning("Please enter valid inputs");
    } else {
      let a = {
        "_id": this.id,
        "img_path": this.img_path,
        "product_cate": this.Category_name,
        "img_index": 0,
        // "show_status": true,
        // "date_and_time" :  new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"}),
        "delete_status": false,
        "date_and_time": "" + new Date(),

      }
      console.log(a);
      this._api.product_cate_edit(a).subscribe(
        (response: any) => {
          console.log(response);
          if (response.Code === 200) {
            //alert('Update Successfully');
            this.showSuccess('Update Successfully');
            this.ngOnInit();
            this.edit_t = false;
            this.id = undefined;
            this.img_path = undefined;
            this.Category_name = undefined;
            // this.Category_code = undefined;
            this.imgType.nativeElement.value = '';

          } else {
            //alert(response.Message);
            this.showError(response.Message);
          }
        }
      );
    }
  }

  filter_date() {
    if (this.E_Date != undefined && this.S_Date != undefined) {
      // let yourDate = new Date(this.E_Date.getTime() + (1000 * 60 * 60 * 24));
      let yourDate = this.E_Date.setDate(this.E_Date.getDate());

      let a = {
        "fromdate": this.datePipe.transform(new Date(this.S_Date), 'yyyy-MM-dd'),
        "todate": this.datePipe.transform(new Date(yourDate), 'yyyy-MM-dd')
      }
      console.log(a);
      this._api.product_cate_filter_date(a).subscribe(
        (response: any) => {
          console.log(response.Data);
          this.rows = response.Data;
        }
      );
    }
    else {
      //alert('Please select the startdate and enddate');
      this.showWarning('Please select the startdate and enddate');
    }

  }
  refersh() {
    this.listpettype();this.E_Date = undefined ; this.S_Date = undefined;
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
        // if (width == 200 && height == 200) {
          let d = this.selectedimgae.size / 100000;
          console.log(d);

          if (d < 10) {
            this.addfiles1();
          } else {
            //alert('Please upload the file below 1 MB');
            this.showWarning('Please upload the file below 64 KB');
            this.imgType.nativeElement.value = "";
          }
        // }
        // else {
        //   //alert('Please upload the file size 100 * 100');
        //   this.showWarning('Please upload the file size 200 * 200');
        //   this.imgType.nativeElement.value = "";
        // }
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
