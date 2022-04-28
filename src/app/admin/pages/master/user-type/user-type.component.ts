import { Component, OnInit, Inject, ViewChild, AfterViewInit, ElementRef, TemplateRef } from '@angular/core'; import { Router } from '@angular/router';
import { ApiService } from '../../../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../../../environments/environment';
import { ToastrManager } from 'ng6-toastr-notifications';




@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.css']
})
export class UserTypeComponent implements OnInit {
  apiUrl = environment.apiUrl;
  imgUrl = environment.imageURL;
  rows = [];
  searchQR: any;
  value1: any;


  user_type_title: string = '';
  user_type_value: any = '';
  user_type_img: string = 'http://13.57.9.246:3000/api/uploads/user-icon.jpg';
  date_and_time: string = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  user_type_list: any = [];
  user_type_id: string = '';
  update_button: boolean;
  selectedimgae: any;
  S_Date: any;
  E_Date: any;
  @ViewChild('imgType', { static: false }) imgType: ElementRef;
  @ViewChild('updateDialog') updateDialog: TemplateRef<any>;
  @ViewChild('addedDialog') addedDialog: TemplateRef<any>;

  constructor(
    private toastr: ToastrManager,
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private http: HttpClient,
    private _api: ApiService,
    private routes: ActivatedRoute,
    private datePipe: DatePipe,
    private dialog: MatDialog
  ) {
       // login_status
if(this.getFromLocal("login_status") === false)
{
  this.router.navigate(['login']);
}
   }

  ngOnInit(): void {
    this.user_type_title = '';
    this.user_type_value = undefined;
    this.user_type_img = 'http://13.57.9.246:3000/api/uploads/user-icon.jpg';
    this.user_type_id = '';
    this.update_button = true;
    this.listpettype();
  }



  listpettype() {
    this._api.user_type_list().subscribe(
      (response: any) => {
        console.log(response.Data);
        this.rows = response.Data;
        this.user_type_list = response.Data;
        console.log(this.user_type_list);
      }
    );
  }

  openAddedDialog() {
    this.dialog.open(this.addedDialog);
  }
  openUpdateDialog() {
    this.dialog.open(this.updateDialog);
  }

  ////// Inserting Data

  Insert_user_type_details() {
    if (this.user_type_title == '') {
      //alert("Please enter the user type")
      this.showWarning("Please enter the user type");
    } else {
      let a = {
        'user_type_title': this.user_type_title,
        'user_type_value': +this.user_type_value,
        'user_type_img': this.user_type_img,
        'date_and_time': new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
      };
      console.log(a);
      this._api.user_type_insert(a).subscribe(
        (response: any) => {
          console.log(response.Data);
          if (response.Code === 200) {
            //alert('Added Successfully');
            this.showSuccess("Added Successfully")
            this.openAddedDialog();
          } else {
            alert(response.Message);
            this.showError(response.Message)
          }
          this.ngOnInit();
        }
      );
    }
  }

  cancel() {
    this.update_button = true;
    this.user_type_title = undefined;
    this.user_type_value = undefined;
    this.user_type_img = undefined;
  }
  Edit_user_type_details() {

    if (this.user_type_title == '') {
      //alert("Please enter the user type")
      this.showWarning("Please enter the user type");
    } else {
      let a = {
        '_id': this.user_type_id,
        'user_type_title': this.user_type_title,
        'user_type_value': +this.user_type_value,
        'user_type_img': this.user_type_img,
        'date_and_time': new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      };
      this._api.user_type_edit(a).subscribe(
        (response: any) => {
          console.log(response.Data);
          //alert("Updated Successfully");
          this.showSuccess("Updated Successfully");
          this.openUpdateDialog();
          this.ngOnInit();
        }
      );
    }


  }

  _keyPress(event: any) {
    const pattern = /[0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }
  }

  Deletecompanydetails(data) {
    let a = {
      '_id': data
    };
    console.log(a);
    this._api.user_type_delete(a).subscribe(
      (response: any) => {
        console.log(response.Data);
        //alert('Deleted Successfully');
        this.showSuccess("Deleted Successfully")
        this.ngOnInit();
      }
    );
  }


  Editcompanydetailsdata(data) {
    this.update_button = false;
    this.user_type_id = data._id;
    this.user_type_value = data.user_type_value;
    this.user_type_img = data.user_type_img;
    this.user_type_title = data.user_type_title;
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
        if (width == 200 && height == 200) {
          let d = this.selectedimgae.size / 100000;
          if (d < 10) {
            this.addfiles1();
          } else {
            alert('Please upload the file below 60 KB');
            this.imgType.nativeElement.value = "";
          }
        }
        else {
          alert('Please upload the file size 200 * 200');
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
    this.http.post(this.imgUrl, fd)
      .subscribe((res: any) => {
        console.log(res);
        this.user_type_img = res.Data;
      });
  }

  usertype_filter_date() {
    if (this.E_Date != undefined && this.S_Date != undefined) {
      // let yourDate = new Date(this.E_Date.getTime() + (1000 * 60 * 60 * 24));
      let yourDate = this.E_Date.setDate(this.E_Date.getDate() + 1);

      let a = {
        "fromdate": this.datePipe.transform(new Date(this.S_Date), 'yyyy-MM-dd'),
        "todate": this.datePipe.transform(new Date(yourDate), 'yyyy-MM-dd')
      }
      console.log(a);
      this._api.user_type_filter_date(a).subscribe(
        (response: any) => {
          console.log(response.Data);
          this.rows = response.Data;
        }
      );
    }
    else {
      alert('Please select the Start Date and End Date');
    }

  }
  refersh() {
    this.listpettype(); this.E_Date = undefined; this.S_Date = undefined;
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
  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }


}
