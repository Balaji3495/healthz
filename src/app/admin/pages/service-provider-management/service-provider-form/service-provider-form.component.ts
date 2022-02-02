import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ApiService } from '../../../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ValidatorService } from '../../../../validator.services';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-service-provider-form',
  templateUrl: './service-provider-form.component.html',
  styleUrls: ['./service-provider-form.component.css']
})
export class ServiceProviderFormComponent implements OnInit {
  apiUrl = environment.apiUrl;
  imgUrl = environment.imageURL;
  Name: any;
  Education: any;
  Specialization: any;
  completion: any;
  Experience: any;
  handled: any;
  Specializationarray: any = [];
  years: any = [];
  address: any;
  tittle: any;
  Clinic_Name: any;
  Latitude: any;
  Longitude: any;
  f_date: any;
  T_date: any;
  CName: any;
  selectedimgae: any;
  Exp: any = [
    { "y": "1+ years" },
    { "y": "5+ years" },
    { "y": "10+ years" },
    { "y": "15+ years" },
    { "y": "20+ years" },
    { "y": "25+ years" },
    { "y": "30+ years" },
  ];
  Experiencearray: any = [];
  Completionarray: any = [];
  handledarray: any = [];
  uploadedFiles: any[] = [];
  @ViewChild('imgType', { static: false }) imgType: ElementRef;
  img_path: any = undefined;
  clinic_arr: any = [];
  govt_arr: any = [];
  certificate_arr: any = [];
  photo_arr: any = [];
  Validation: any;
  Email: any;
  Phone: any;
  Email_id: any;
  Email_idError: any;
  userid: any = undefined;
  type: any;
  detail: any;
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
    if (this.type == 'edit') {
    
      this.detail = this.getFromLocal('view_detail_data');
      console.log(this.detail)
      this.userid = this.detail.user_id._id;
      this.Email = this.detail.user_id.user_email;
      this.Phone = this.detail.user_id.user_phone;
      this.tittle = this.detail.dr_title;
      this.Name = this.detail.dr_name;
      this.Clinic_Name = this.detail.clinic_name;
      this.address = this.detail.clinic_loc;
      this.Latitude = this.detail.clinic_lat;
      this.Longitude = this.detail.clinic_long;
      this.Completionarray = this.detail.education_details;
      this.Experiencearray = this.detail.experience_details;
      this.Specializationarray = this.detail.specialization;
      this.handledarray = this.detail.pet_handled;
      this.clinic_arr = this.detail.clinic_pic;
      this.certificate_arr = this.detail.certificate_pic;
      this.govt_arr = this.detail.govt_id_pic;
      this.photo_arr = this.detail.photo_id_pic;
    }
    for (let i = 1980; i < 2020; i++) {
      this.years.push({ "y": i + 1 })
    }
  }
  cancel() {
    this.router.navigateByUrl('/admin/Doctor')
  }
  addSpecialization() {

    if (this.Specialization != undefined && this.Specialization != '') {
      let obj = { "specialization": this.Specialization }
      this.Specializationarray.push(obj);
      this.Specialization = undefined;
    }
  }
  remove_Specialization(i) {
    this.Specializationarray.splice(i, 1);

  }
  addcompletion() {

    if (this.completion != undefined && this.completion != '' && this.Education != undefined && this.Education != '') {
      let obj = { "education": this.Education, "year": this.completion }
      this.Completionarray.push(obj);
      this.completion = undefined;
      this.Education = undefined;
    }
    else {
      //alert("Pleasefill all the fields");
      this.showWarning("Please fill all the fields")
    }
  }
  remove_completion(i) {
    this.Completionarray.splice(i, 1);

  }
  addExperience() {

    if (this.CName != undefined && this.CName != '' && this.f_date != undefined && this.T_date != undefined) {
      let obj = { "company": this.CName, "from": this.f_date, "to": this.T_date }
      this.Experiencearray.push(obj);
      this.CName = undefined;
      this.f_date = undefined;
      this.T_date = undefined;
    }
    else {
      //alert("Pleasefill all the fields")
      this.showWarning("Please fill all the fields") 
    }
  }
  remove_Experience(i) {
    this.Experiencearray.splice(i, 1);

  }
  addhandled() {

    if (this.handled != undefined && this.handled != '') {
      let obj = { "pet_handled": this.handled }
      this.handledarray.push(obj);
      this.handled = undefined;
    }
  }
  remove_handled(i) {
    this.handledarray.splice(i, 1);

  }
  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      console.log(this.uploadedFiles)
    }

  }

  //////Additional Calling Funcation//////
  fileupload(event, str) {
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
        if (width > 100 && height > 100) {
          let d = this.selectedimgae.size / 100000;
          if (d < 10) {
            this.addfiles(str);
          } else {
            //alert('Please upload the file below 1 MB');
            this.showWarning("Please upload the file below 1 MB")
            this.imgType.nativeElement.value = "";
          }
        }
        else {
          //alert('Please upload the file size 100 * 100');
          this.showWarning("Please upload the file size 100 * 100")
          this.imgType.nativeElement.value = "";
        }
      };
      img.src = fr.result as string; // The data URL
    };
    fr.readAsDataURL(this.selectedimgae);
    // clear the value after upload
  }


  addfiles(data: any) {
    const fd = new FormData();
    fd.append('sampleFile', this.selectedimgae, this.selectedimgae.name);
    this.http.post(this.imgUrl , fd)
      .subscribe((res: any) => {
        console.log(res);
        this.img_path = res.Data;
        if (data == 'Clinic') {
          let obj = { "clinic_pic": this.img_path }
          this.clinic_arr.push(obj);
          this.img_path = undefined;

        }
        if (data == 'Govt') {
          let obj = { "govt_id_pic": this.img_path }
          this.govt_arr.push(obj);
          this.img_path = undefined;

        }
        if (data == 'Photo') {
          let obj = { "photo_id_pic": this.img_path }
          this.photo_arr.push(obj);
          this.img_path = undefined;
          console.log(this.photo_arr)

        }
        if (data == 'Certificate') {
          let obj = { "certificate_pic": this.img_path }
          this.certificate_arr.push(obj);
          this.img_path = undefined;

        }
      });


  }
  remove_clinic_img(i) {
    this.clinic_arr.splice(i, 1);
  }
  remove_govt_img(i) {
    this.govt_arr.splice(i, 1);
  }
  remove_photo_img(i) {
    this.photo_arr.splice(i, 1);
  }
  remove_Certificate_img(i) {
    this.certificate_arr.splice(i, 1);
  }
  validation_1() {
    if (this.tittle == undefined || this.tittle == '' || this.Name == undefined || this.Name == '' || this.Email == undefined || this.Phone == undefined || this.Email_idError == true || this.Phone == '' || this.Phone.length != 10) {
      this.Validation = false;
      console.log(this.Validation)
    }
    else {
      this.Validation = true;
      console.log(this.Validation)
    }
  }
  validation() {

    if (this.Name == undefined || this.Name == '' || this.tittle == undefined || this.tittle == '' || this.Completionarray.length == 0 || this.Specializationarray.length == 0 || this.handledarray.length == 0 || this.clinic_arr.length == 0 || this.photo_arr.length == 0 || this.govt_arr.length == 0 || this.certificate_arr.length == 0 || this.Clinic_Name == undefined || this.Clinic_Name == '' || this.address == undefined || this.address == '' || this.Latitude == undefined || this.Longitude == '' || this.Latitude == '' || this.Longitude == undefined) {
      this.Validation = false;
      console.log(this.Validation)
    }
    else {
      this.Validation = true;
      console.log(this.Validation)
    }
  }
  create_1() {
    this.validation_1();
    if (this.Validation == false) {
      // alert("Please enter valid inputs");
      this.showWarning("Please enter valid inputs");
    } else {
      let a = {
        "first_name": this.tittle,
        "last_name": this.Name,
        "user_email": this.Email,
        "user_phone": this.Phone,
        "user_type": 4,
        "date_of_reg": new Date(),
        "mobile_type": 'Admin',
        "user_status": "complete"
      };
      console.log(a);
      this._api.user_create(a).subscribe(
        (response: any) => {
          console.log(response.Data);
          if (response.Code === 200) {
            this.userid = response.Data.user_details._id;
            console.log(this.userid)
            //alert('Added Successfully');
            this.showSuccess("Added Successfully")
          } else {
            this.showError(response.Message);
            alert(response.Message);
          }
        }
      );
    }
  }
  create() {
    this.validation();
    if (this.Validation == false) {
      // alert("Please enter valid inputs");
      this.showWarning("Please enter valid inputs")
    } else {
      let a = {
        "user_id": this.userid,
        "dr_title": this.tittle,
        "dr_name": this.Name,
        "clinic_name": this.Clinic_Name,
        "clinic_loc": this.address,
        "clinic_lat": this.Latitude,
        "clinic_long": this.Longitude,
        "education_details": this.Completionarray,
        "experience_details": this.Experiencearray,
        "specialization": this.Specializationarray,
        "pet_handled": this.handledarray,
        "clinic_pic": this.clinic_arr,
        "certificate_pic": this.certificate_arr,
        "govt_id_pic": this.govt_arr,
        "photo_id_pic": this.photo_arr,
        "profile_status": 0,
        "profile_verification_status": "Not verified",
        "date_and_time": "" + new Date(),
      }
      console.log(a);
      this._api.doctor_details_create(a).subscribe(
        (response: any) => {
          console.log(response.Data);
          if (response.Code === 200) {
            //alert('Added Successfully');
            this.showSuccess("Added Successfully")
            this.router.navigateByUrl('/admin/Doctor')
          } else {
            this.showError(response.Message)
            //alert(response.Message);
          }
        }
      );
    }
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
  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  getFromLocal(key): any {
    return this.storage.get(key);
  }
  edit() {
    let a = {
      "_id" : this.detail._id,
      "user_id": this.userid,
      "dr_title": this.tittle,
      "dr_name": this.Name,
      "clinic_name": this.Clinic_Name,
      "clinic_loc": this.address,
      "clinic_lat": this.Latitude,
      "clinic_long": this.Longitude,
      "education_details": this.Completionarray,
      "experience_details": this.Experiencearray,
      "specialization": this.Specializationarray,
      "pet_handled": this.handledarray,
      "clinic_pic": this.clinic_arr,
      "certificate_pic": this.certificate_arr,
      "govt_id_pic": this.govt_arr,
      "photo_id_pic": this.photo_arr,
      "profile_status": 0,
      "profile_verification_status": "Not verified",
      "date_and_time": "" + new Date(),
    }
    console.log(a);
    this._api.doctor_details_edit(a).subscribe(
      (response: any) => {
        console.log(response.Data);
        if (response.Code === 200) {
          //alert('updated Successfully');
          this.showSuccess("updated Successfully")
          this.router.navigateByUrl('/admin/Doctor')
        } else {
          this.showError(response.Message);
          // alert(response.Message);
        }
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
}
