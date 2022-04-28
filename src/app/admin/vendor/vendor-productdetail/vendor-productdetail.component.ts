import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ApiService } from '../../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-vendor-productdetail',
  templateUrl: './vendor-productdetail.component.html',
  styleUrls: ['./vendor-productdetail.component.css']
})
export class VendorProductdetailComponent implements OnInit {
  apiUrl = environment.apiUrl;
  imgUrl = environment.imageURL;


  searchQR: any;
  S_Date: any;
  E_Date: any;
  list: any;
  Catagories_list: any;
  rows: any;
  cat_id: any;
  product_detail: any;
  vendor_list: any[];
  vendor_id: { _id: any; bussiness_name: any; bussiness: any; };
statuschecked:boolean=false;

constructor(
    private formBuilder:FormBuilder,
    private toastr:ToastrManager,
    private router: Router,
    private location: Location,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private _api: ApiService,
    private http: HttpClient,
    private datePipe: DatePipe,
    ){}



  ngOnInit(): void {
this.vendorlist();
    this.catagorieslist();
    this._api.product_details_list().subscribe(
      (response: any) => {
        console.log(response.Data);
        this.list = response.Data.reverse();
      }
    );
    
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
      this._api.product_details_filter_date(a).subscribe(
        (response: any) => {
          console.log(response.Data);
          this.list = response.Data;
        }
      );
    }
    else {
      this.showWarning("Please select the Start Date and End Date");
      //alert('Please select the Start Date and End Date');
    }

  }
  refersh() {
     this.E_Date = undefined; this.S_Date = undefined;
  }



  update() {
   
  }
  cancel() {
 
  }

  delete(data) {
    let a = {
      '_id': data
    };
    console.log(a);
    this._api.product_details_delete(a).subscribe(
      (response: any) => {
        console.log(response.Data);
        //alert('Deleted Successfully');
        this.showSuccess("Deleted Successfully");
        this.ngOnInit();
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


  makeTDeal(_id, today_deal){
    const data = {
      _id : _id,
      today_deal : today_deal
    }
    this._api.product_details_edit(data).subscribe(data=>{
      if(data['Code'] == 200){
        this.showSuccess(data['Message']);
        this.refersh();
      }else {
        this.showError(data['Message']);
      }
    });
  }

  addproduct_details(){
    this.router.navigateByUrl('/admin/vendor/vendor_add_productdetail');
  }

  editproduct_details(data){
    this.saveInLocal('product_detail', data);
    this.router.navigateByUrl('/admin/vendor/vendor_edit_productdetail');
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }
  catagorieslist() {
    this._api.product_cate_list().subscribe(
      (response: any) => {
        console.log(response.Data);
        this.rows = response.Data;
        this.Catagories_list = response.Data;
        console.log(this.Catagories_list);
        this.cat_id = this.product_detail.cat_id ;
      }
    );
  }
  
  vendorlist() {
    this._api.vendor_details_list().subscribe(
      (response: any) => {
        console.log(response.Data);
        this.rows = response.Data;
        this.vendor_list = [];
        this.rows.forEach(element => {
          let a = {
            _id: element._id,
            bussiness_name:  element.bussiness_name,
            bussiness:  element.bussiness,
          }
          this.vendor_list.push(a)
        });
        console.log(this.vendor_list);
        console.log(this.product_detail.user_id);
        let a = {
          _id: this.product_detail.user_id._id,
          bussiness_name: this.product_detail.user_id.bussiness_name,
          bussiness: this.product_detail.user_id.bussiness,
        }
        this.vendor_id = a;
      }
    );
  }

}
