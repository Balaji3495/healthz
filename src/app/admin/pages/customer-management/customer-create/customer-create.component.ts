import { Component, OnInit, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ValidatorService } from '../../../../validator.services';
import { ApiService } from '../../../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { environment } from '../../../../../environments/environment';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  apiUrl = environment.apiUrl;
  imgUrl = environment.imageURL;
  Fname: any;
  Lname: any;
  Email: any;
  Phone: any;
  Email_id: any;
  Email_idError: any;
  Validation: any;
  type:any;
  detail:any;
  constructor(
    private toastr:ToastrManager,
    private router: Router,
    private ValidatorService: ValidatorService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private http: HttpClient,
    private _api: ApiService,
    private routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.type = this.getFromLocal('fun_type');
    if(this.type == 'edit'){
      this.detail = this.getFromLocal('view_detail_data');
      console.log(this.detail)
      this.Fname = this.detail.first_name;
      this.Lname = this.detail.last_name;
      this.Email = this.detail.user_email;
      this.Phone = this.detail.user_phone;
    }
  
  }
  cancel() {
    this.router.navigateByUrl('/admin/Customer_Management')
  }
  EmailidChange(data) {
    this.Email_id = data;
    this.Email_idError = this.ValidatorService.emailValidator(this.Email_id);
  }
  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();

    }
  }

  validation() {
    if (this.Fname == undefined || this.Fname == '' || this.Lname == undefined || this.Lname == '' || this.Email == undefined || this.Phone == undefined || this.Email_idError == true ||  this.Phone == ''  || this.Phone.length != 10) {
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
      // alert("Please enter valid inputs");
      this.showWarning("Please enter valid inputs")
    } else {
      let a = {
        "first_name": this.Fname,
        "last_name": this.Lname,
        "user_email": this.Email,
        "user_phone": this.Phone,
        "user_type": 1,
        "date_of_reg": new Date(),
        "mobile_type": 'Admin',
        "user_status" : "complete"
      };
      console.log(a);
      this._api.user_create(a).subscribe(
        (response: any) => {
          console.log(response.Data);
          if (response.Code === 200) {
            // alert('Added Successfully');
            this.showSuccess("Added Successfully");
            this.router.navigateByUrl('/admin/Customer_Management')
          } else {
            this.showError(response.Message);
            // alert(response.Message);
          }
        }
      );
    }
  }
  edit() {
    this.validation();
    if (this.Validation == false) {
      // alert("Please enter valid inputs");
      this.showWarning("Please enter valid inputs")
    } else {
      let a = {
        "_id":  this.detail._id,
        "first_name": this.Fname,
        "last_name": this.Lname,
        "user_email": this.Email,
        "user_phone": this.Phone,
        "user_type": 1,
        "date_of_reg": new Date(),
        "mobile_type": 'Admin',
        "user_status" : "complete"
      };
      console.log(a);
      this._api.user_edit(a).subscribe(
        (response: any) => {
          console.log(response.Data);
          if (response.Code === 200) {
            // alert('updated Successfully');
            this.showSuccess("updated Successfully")
            this.router.navigateByUrl('/admin/Customer_Management')
          } else {
            this.showError(response.Message)
            // alert(response.Message);
          }
        }
      );
    }
  }

  
  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
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
