import { Component, OnInit, Inject,  ViewChild, AfterViewInit, ElementRef, TemplateRef } from '@angular/core';import { Router } from '@angular/router';
import { ApiService } from '../../../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../../../environments/environment';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-doc-specialization',
  templateUrl: './doc-specialization.component.html',
  styleUrls: ['./doc-specialization.component.css']
})
export class DocSpecializationComponent implements OnInit {
  apiUrl = environment.apiUrl;
  imgUrl = environment.imageURL;
  rows = [];
  searchQR:any;
  value1:any;


  specialzation : string = '';
  date_and_time : string = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
  pet_type_list : any = [];
  pet_type_id : string = '';

  update_button : boolean;
  selectedimgae : any;
  S_Date: any;
  E_Date: any;
  @ViewChild('imgType', { static: false }) imgType: ElementRef;
  @ViewChild('updateDialog') updateDialog: TemplateRef<any>;
  @ViewChild('addedDialog') addedDialog: TemplateRef<any>;

  constructor(
    private router: Router,
    private toastr:ToastrManager,
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

    this.specialzation = '';
    // this.user_type_img = 'http://18.237.123.253:3000/api/uploads/template.jpg';
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
  openDialogWithRef(ref: TemplateRef<any>) {
    this.dialog.open(ref);
  }

  openAddedDialog() {
    this.dialog.open(this.addedDialog);
  }
  openUpdateDialog() {
    this.dialog.open(this.updateDialog);
  }

  listpettype() {
    this._api.doctor_spec_list().subscribe(
      (response: any) => {
        console.log(response.Data);
        this.rows = response.Data;
        this.pet_type_list = response.Data;
        console.log(this.pet_type_list);
      }
    );
  }


  
  ////// Inserting Data

  Insert_pet_type_details() {


    if(this.specialzation == ''){
      // alert("Please enter the pet type")
      this.showWarning("Please enter the pet type");
    }else{
    let a = {
      'specialzation' : this.specialzation,
      'date_and_time' : new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"}),
      };
    console.log(a);
    this._api.doctor_spec_insert(a).subscribe(
    (response: any) => {
      console.log(response.Data);
      if ( response.Code === 200 ) {
        //alert('Added Successfully');
        this.showSuccess("Added Successfully");
        this. openAddedDialog();
      }else {
        alert(response.Message);
      }
      this.ngOnInit();
    }
  );
    }
  }


  Edit_pet_type_details(){
    if(this.specialzation == ''){
      // alert("Please enter the pet type")
      this.showWarning("Please enter the pet type");
    }else{
    let a = {
      '_id' : this.pet_type_id,
      'specialzation' : this.specialzation,
     };
    this._api.doctor_spec_edit(a).subscribe(
    (response: any) => {
      console.log(response.Data);
      this.openUpdateDialog();
      //alert("Updated Successfully");
      this.showSuccess("Updated Successfully");
      this.ngOnInit();
    }
  );
    }
  }



  Deletecompanydetails(data) {
    let a = {
      '_id' : data
     };
    console.log(a);
    this._api.doctor_spec_delete(a).subscribe(
    (response: any) => {
      console.log(response.Data);
      // alert('Deleted Successfully');
      this.showSuccess("Deleted Successfully");
      this.ngOnInit();
    }
  );
  }


  Editcompanydetailsdata(data) {
    this.update_button = false;
    this.pet_type_id = data._id;
    this.specialzation = data.specialzation ;
  }


    filter_date() {
      if ( this.E_Date != undefined && this.S_Date != undefined) {
        // let yourDate = new Date(this.E_Date.getTime() + (1000 * 60 * 60 * 24));
        let yourDate= this.E_Date.setDate(this.E_Date.getDate());
  
        let a = {
          "fromdate":this.datePipe.transform(new Date(this.S_Date),'yyyy-MM-dd'),
          "todate" : this.datePipe.transform(new Date(yourDate),'yyyy-MM-dd')
          }
        console.log(a);
        this._api.doctor_spec_filter_date(a).subscribe(
          (response: any) => {
            console.log(response.Data);
            this.rows = response.Data;
          }
        );
      }
      else{
        // alert('Please select the Start Date and End Date');
        this.showWarning("Please select the Start Date and End Date")
      }
     
    }
    
  cancel() {
    this.update_button = true;
    this.specialzation= undefined;
  }
    refersh(){
      this.listpettype();this.E_Date = undefined ; this.S_Date = undefined;
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
