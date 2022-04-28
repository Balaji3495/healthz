import { Component, OnInit, Inject, ViewChild, AfterViewInit, ElementRef } from '@angular/core'; import { Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-sp-detail',
  templateUrl: './sp-detail.component.html',
  styleUrls: ['./sp-detail.component.css']
})
export class SpDetailComponent implements OnInit {

  apiUrl = environment.apiUrl;
  imgUrl = environment.imageURL;
  rows = [];
  searchQR: any;
  value1: any;


  specialzation: string = '';
  date_and_time: string = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  pet_type_list: any = [];
  pet_type_id: string = '';
  S_Date: any;
  E_Date: any;
  update_button: boolean;
  selectedimgae: any;
  specialzation_list: any;
  specialzation_f: any;
  Main_list: any;
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

    this.specialzation = '';
    // this.user_type_img = 'http://18.237.123.253:3000/api/uploads/template.jpg';
    this.pet_type_id = '';
    this.update_button = true;
    this.listpettype();
    this._api.doctor_spec_list().subscribe(
      (response: any) => {
        console.log(response.Data);
        this.specialzation_list = response.Data;
        console.log(this.specialzation_list);
      }
    );
  }



  listpettype() {
    this._api.service_provider_list().subscribe(
      (response: any) => {
        console.log(response.Data);
        this.rows = response.Data;
        this.Main_list = response.Data;
        console.log(this.Main_list);
      }
    );
  }


  delete(data) {
    let a = {
      '_id': data
    };
    console.log(a);
    this._api.service_provider_delete(a).subscribe(
      (response: any) => {
        console.log(response.Data);
        //alert('Deleted Successfully');
        this.showSuccess("Deleted Successfully")
        this.ngOnInit();
      }
    );
  }


  ////// Inserting Data

  Insert_pet_type_details() {

    if (this.specialzation == '') {
      //alert("Please enter the pet type")
      this.showWarning("Please enter the pet type")
    } else {
      let a = {
        'specialzation': this.specialzation,
        'date_and_time': new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
      };
      console.log(a);
      this._api.service_provider_insert(a).subscribe(
        (response: any) => {
          console.log(response.Data);
          if (response.Code === 200) {
            //alert('Added Successfully');
            this.showSuccess("Added Successfully")
          } else {
            this.showError(response.Message);
            //alert(response.Message);
          }
          this.ngOnInit();
        }
      );
    }
  }


  Edit_pet_type_details() {
    if (this.specialzation == '') {
      //alert("Please enter the pet type")
      this.showWarning("Please enter the pet type")
    } else {
      let a = {
        '_id': this.pet_type_id,
        'profile_verification_status': 'Verifiyed',
      };
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



  verify(status, id) {
    let a = {
      '_id': id,
      'profile_verification_status': status,
    };
    this._api.service_provider_edit(a).subscribe(
      (response: any) => {
        console.log(response.Data);
        //alert("Updated Successfully");
        this.showSuccess("Updated Successfully")
        this.ngOnInit();
      }
    );
  }


  Deletecompanydetails(data) {
    let a = {
      '_id': data
    };
    console.log(a);
    this._api.service_provider_delete(a).subscribe(
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
    this.pet_type_id = data._id;
    this.specialzation = data.specialzation;
  }




  goToLink1(url: string) {
    window.open(url, "_blank");
  }

  view_details(item) {
    this.saveInLocal('view_detail', 'Service_provider');
    this.saveInLocal('view_detail_data', item);
    this.router.navigateByUrl('/service_provider/service_provider_detail_view')
  }




  edit(item) {
    this.saveInLocal('view_detail_data', item);
    this.saveInLocal('fun_type', 'edit');
    this.router.navigateByUrl('/admin/Doctor_form')

  }

  spec_filter() {
    console.log(this.specialzation_f);
    this.rows = this.Main_list;

    this.rows = this.rows.filter((x: any) => x.specialization.some((y: any) => y.specialization == this.specialzation_f.specialzation));
    console.log(this.rows)

  }
  Refresh(){
    this.specialzation_f = undefined;
    this.rows = this.Main_list;
  }





  // //////Additional Calling Funcation//////
  // fileupload(event) {
  //   console.log("this.width")
  //   this.selectedimgae = event.target.files[0];
  //   console.log(this.selectedimgae.size / 100000);
  //   let fr = new FileReader();
  //   fr.onload = () => { // when file has loaded
  //     var img = new Image();
  //     img.onload = () => {
  //       let width = img.width;
  //       let height = img.height;
  //       console.log(width,height);
  //       if(width !== 500 && height !== 500){
  //         let d = this.selectedimgae.size / 100000 ;
  //         if(d < 10){
  //         this.addfiles1();
  //        }else{
  //         alert('Please upload the file below 1 MB');
  //         this.imgType.nativeElement.value = "";
  //        }
  //       }
  //       else{
  //         alert('Please upload the file size 500 * 500');
  //         this.imgType.nativeElement.value = "";
  //       }
  //     };
  //     img.src = fr.result as string; // The data URL
  //   };
  //   fr.readAsDataURL(this.selectedimgae);
  //   // clear the value after upload
  // }


  // addfiles1() {
  // const fd = new FormData();
  // fd.append('sampleFile', this.selectedimgae, this.selectedimgae.name);
  // this.http.post('http://18.237.123.253:3000/upload', fd)
  //   .subscribe((res: any) => {
  //     console.log(res);
  //     this.user_type_img = res.Data;
  //   });
  //  }



  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }

  doc_form() {
    this.router.navigateByUrl('/admin/Service_Provider_form')
    this.saveInLocal('fun_type', 'create');
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
      this._api.service_providerfilter_date(a).subscribe(
        (response: any) => {
          console.log(response.Data);
          this.rows = response.Data;
        }
      );
    }
    else{
      this.showWarning("Please select the Start Date and End Date");
      //alert('Please select the Start Date and End Date');
    }

  }
  refersh(){
    this.listpettype();this.E_Date = undefined ; this.S_Date = undefined;
  }


service_form() {
    this.router.navigateByUrl('/admin_panel/Service_Provider_form')
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
