import { Component, OnInit, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ApiService } from '../../../../api.service'; 
import { DatePipe } from '@angular/common';
import { environment } from '../../../../../environments/environment';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-petlist',
  templateUrl: './petlist.component.html',
  styleUrls: ['./petlist.component.css']
})
export class PetlistComponent implements OnInit {
  apiUrl = environment.apiUrl;
  imgUrl = environment.imageURL;
  rows = [];
  searchQR:any;
  value1:any;
  pet_list:any;
  S_Date: any;
  E_Date: any;
  view_detail_data:any;
  list: any;
  constructor(
    private toastr:ToastrManager,
    private router: Router,
    private location: Location,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private _api: ApiService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.pet_list = this.getFromLocal('pet_list');
    this.rows = [{ type: "Dog", name: "dog1" },
    { type: "Cat", name: "cat1" },
    { type: "Cat", name: "cat1" },
    { type: "Cat", name: "cat1" },
    { type: "Cat", name: "cat1" },
    { type: "Cat", name: "cat1" },
    { type: "Cat", name: "cat1" },
    { type: "Cat", name: "cat1" },
    { type: "Cat", name: "cat1" },
    { type: "Cat", name: "cat1" },
    { type: "Cat", name: "cat1" },
    { type: "Cat", name: "cat1" }]
    
  }
service_form() {
  this.saveInLocal('fun_type', 'create');
    this.router.navigateByUrl('/admin/Customer_form')
  }
  back(){
   this.location.back();
  }

  
  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
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
          'user_id': this.pet_list.userdetailsModels[0]._id
        };
        console.log(b);
        this._api.single_user_detail(b).subscribe(
          (response: any) => {
            console.log(response.Data);
            this.pet_list = response.Data;
            console.log(this.pet_list);
          }
        );
      }
    );
  }
  edit_details(item) {
    this.saveInLocal('view_detail_data', item);
    this.saveInLocal('fun_type', 'edit');
    this.router.navigateByUrl('/admin/Customer_form')

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
      this._api.splashscreen_filter_date(a).subscribe(
        (response: any) => {
          console.log(response.Data);
          this.list = response.Data;
        }
      );
    }
    else{
      // alert('Please select the startdate and enddate');
      this.showWarning("Please select the startdate and enddate");
    }
   
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
