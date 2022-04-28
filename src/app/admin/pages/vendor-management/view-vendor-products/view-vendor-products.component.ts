import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ApiService } from '../../../../api.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../../environments/environment';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-vendor-products',
  templateUrl: './view-vendor-products.component.html',
  styleUrls: ['./view-vendor-products.component.css']
})
export class ViewVendorProductsComponent implements OnInit {
  apiUrl = environment.apiUrl;
  imgUrl = environment.imageURL;
  thumbnail_image : any;
  rows = [];
  searchQR: any;
  Tittle: any;
  Description: any;
  selectedtype: any;
  type: any = [];
  threshould: any;
  Validation: any;
  selectedimgae: any;
  img_path: string = undefined;
  list: any;
  edit_t: boolean = false;
  id: any;
  S_Date: any;
  E_Date: any;
  vendor_list: any;
  Catagories_list: any;
  Sub_Catagories_list: any;
  Product_Name: any;
  uploadedFiles: any = [];
  product_code: any;
  Thmp_list: any = [];
  @ViewChild('imgType', { static: false }) imgType: ElementRef;
  Vendor: any;
  pet_type_list: any = [];
  pet_breed_list: any = [];
  Category: any;
  pettype: any;
  Age: any;
  Cost: any;
  Count: any;
  Discount: any;
  petBreed: any;
  Sub_Category: any;
  Ages: any = [{ 'y': 1 }, { 'y': 2 }, { 'y': 3 }, { 'y': 4 }, { 'y': 5 }, { 'y': 6 }, { 'y': 7 }, { 'y': 8 }, { 'y': 9 }, { 'y': 10 }, { 'y': 11 }, { 'y': 12 }, { 'y': 13 }, { 'y': 14 }, { 'y': 15 }, { 'y': 16 }, { 'y': 17 }, { 'y': 18 }, { 'y': 19 }, { 'y': 20 }]
  sub_cate_list: any;
  subcat_main: any;
  today_deal: boolean;
  productForm: FormGroup;
  VendorID: any;
  vendorFilter: any = { user_id: '' };
  constructor(
    private formBuilder:FormBuilder,
    private toastr:ToastrManager,
    private router: Router,
    private location: Location,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private _api: ApiService,
    private http: HttpClient,
    private datePipe: DatePipe,
    ){
   }

  ngOnInit(): void {
    this.listpettype();
    this.vendorlist();
    this.catagorieslist();
    this.pettypelist();
    this.listpetbreed();
    this.sub_cat_list();
    // this.subcatagorieslist();
  }
  listpettype() {
    const vendor_id = this.getFromLocal("Vendor_id");
    this.VendorID = vendor_id;
    this._api.getlist_vendor_products(vendor_id).subscribe(
      (response: any) => {
        console.log(response);
        this.list = response.Data.reverse();
      }
    );
  }
  pettypelist() {
    this._api.pet_type_list().subscribe(
      (response: any) => {
        this.rows = response.Data;
        this.pet_type_list = response.Data;
      }
    );
  }
  listpetbreed() {
    this._api.pet_breed_list().subscribe(
      (response: any) => {
        this.pet_breed_list = response.Data;
      }
    );
  }
  vendorlist() {
    this._api.vendor_details_list().subscribe(
      (response: any) => {
        this.rows = response.Data;
        this.vendor_list = response.Data;
      }
    );
  }
  catagorieslist() {
    this._api.product_cate_list().subscribe(
      (response: any) => {
        this.rows = response.Data;
        this.Catagories_list = response.Data;
      }
    );
  }
  sub_cat_list() {
    this._api.product_subcat_list().subscribe(
      (response: any) => {
        this.subcat_main = response.Data;
      }
    );
  }
  subcate() {

    let a = this.subcat_main;
    this.sub_cate_list = a.filter((X: any) => this.Category.product_cate == X.product_categ)
  }
  // subcatagorieslist() {
  //   this._api.product_cate_list().subscribe(
  //     (response: any) => {
  //       console.log(response.Data);
  //       this.rows = response.Data;
  //       this.Sub_Catagories_list = response.Data;
  //       console.log(this.Sub_Catagories_list);
  //     }
  //   );
  // }


    //////Additional Calling Funcation//////
    fileupload1(event, str) {
      this.selectedimgae = event.target.files[0];
      let fr = new FileReader();
      fr.onload = () => { // when file has loaded
        var img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          if (width > 100 && height > 100) {
            let d = this.selectedimgae.size / 100000;
            if (d < 10) {
              this.addfiles(str);
            } else {
              // alert('Please upload the file below 1 MB');
              this.showWarning("Please upload the file below 1 MB");
              this.imgType.nativeElement.value = "";
            }
          }
          else {
            // alert('Please upload the file size 100 * 100');
            this.showWarning("Please upload the file size 200 * 120");
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
        if (data == 'thumbnail_img') {
            this.thumbnail_image = res.Data;
            this.img_path = undefined;
          }
        });

    }


  validation() {
    if (this.threshould == '' || this.threshould == undefined || this.Thmp_list.length == 0 || this.VendorID == undefined || this.Category == undefined || this.pettype == undefined || this.Age == undefined || this.Product_Name == undefined || this.Product_Name == '' || this.Cost == undefined || this.Cost == ''  || this.Description == undefined || this.Description == '') {
      this.Validation = false;
    }
    else {
      this.Validation = true;
    }
  }


  create() {

    this.validation();
    if (this.Validation == false) {
      //alert("Please enter valid inputs")
      this.showWarning("Please enter valid inputs")
    } else {
      let obj1 = [];
      let obj2 = [];
      let obj3 = [];
      for (let i = 0; i < this.petBreed.length; i++) {
        obj1.push(this.petBreed[i]._id)
      }
      for (let i = 0; i < this.pettype.length; i++) {
        obj2.push(this.pettype[i]._id)
      }
      for (let i = 0; i < this.Age.length; i++) {
        obj3.push(this.Age[i].y)
      }

      let a = {
        "user_id": this.VendorID,
        "cat_id": this.Category._id,
        "breed_type": obj1,
        "pet_type": obj2,
        "age": obj3,
        "cost": this.Cost,
        "threshould": +this.threshould,
        "product_discription": this.Description,
        "product_name": this.Product_Name,
        "product_img": this.Thmp_list,
        "discount": this.Discount,
        "related": '',
        "count": 0,
        "date_and_time": '' + new Date(),
        "mobile_type": 'Admin',
        "verification_status": "Not Verified",
        "thumbnail_image":this.thumbnail_image,
        "status": true,
        "delete_status": false
      }
      console.log(a);
      this._api.product_details_create(a).subscribe(
        (response: any) => {
          console.log(response);
          if (response.Code === 200) {
            //alert('Added Successfully');
            this.showSuccess("Added Successfully")
            this.Description = undefined;
            this.Thmp_list = [];
            this.img_path = undefined;
            this.Vendor = undefined;
            this.Category = undefined;
            this.Sub_Category = undefined;
            this.pettype = undefined;
            this.Age = undefined;
            this.Product_Name = undefined;
            this.Cost = undefined;
            this.Discount = undefined;
            this.threshould = undefined;
            this.petBreed = undefined;

            this.ngOnInit();
          } else {
            this.showError(response.Message);
            // alert(response.Message);
          }
        }
      );
    }
  }
  //////Additional Calling Funcation//////
  fileupload(event) {
    this.selectedimgae = event.target.files[0];
    let fr = new FileReader();
    fr.onload = () => { // when file has loaded
      var img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width == 200 && height == 200) {
          let d = this.selectedimgae.size / 100000;
          if (d < 10) {
            this.addfiles1();
          } else {
            //alert('Please upload the file below 1 MB');
            this.showWarning("Please upload the file below 1 MB");
            this.imgType.nativeElement.value = "";
          }
        }
        else {
          this.showWarning("Please upload the file size 200 * 200");
          // alert('Please upload the file size 100 * 100');
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
    this.http.post(this.imgUrl , fd)
      .subscribe((res: any) => {
        this.img_path = res.Data;
      });
  }


  delete(data) {
    let a = {
      '_id': data
    };
    this._api.product_details_delete(a).subscribe(
      (response: any) => {
        //alert('Deleted Successfully');
        this.showSuccess("Deleted Successfully");
        this.ngOnInit();
      }
    );
  }

  edit(item) {
    this.edit_t = true;
    this.id = item._id;
    let obj3 = [];
    for (let i = 0; i < item.age.length; i++) {
      obj3.push({ 'y': item.age[i] });
    }
    let arr1 = this.vendor_list;
    let arr2 = this.Catagories_list;
    this.Vendor = arr1.filter((x: any) => x._id == item.user_id)[0]
    this.Category = item.cat_id;
    this.Age = obj3;
    this.Cost = item.cost;
    this.pettype = item.pet_type;
    let c = this.pet_breed_list;
    let d = c.filter((x: any) => item.breed_type.some((y: any) => y._id == x._id))
    this.petBreed = d;
    console.log(this.petBreed)
    this.threshould = item.threshould
    this.Description = item.product_discription
    this.Product_Name = item.product_name
    this.Thmp_list = item.product_img
    this.Discount = item.discount
    this.thumbnail_image = item.thumbnail_image
  }
  update() {
    this.validation();
    if (this.Validation == false) {
      //alert("Please enter valid inputs");
      this.showWarning("Please enter valid inputs")
    } else {
      let obj1 = [];
      let obj2 = [];
      let obj3 = [];
      for (let i = 0; i < this.petBreed.length; i++) {
        obj1.push(this.petBreed[i]._id)
      }
      for (let i = 0; i < this.pettype.length; i++) {
        obj2.push(this.pettype[i]._id)
      }
      for (let i = 0; i < this.Age.length; i++) {
        obj3.push(this.Age[i].y)
      }

      let a = {
        "_id": this.id,
        "user_id": this.VendorID,
        "cat_id": this.Category._id,
        "breed_type": obj1,
        "pet_type": obj2,
        "age": obj3,
        "cost": this.Cost,
        "threshould": +this.threshould,
        "product_discription": this.Description,
        "product_name": this.Product_Name,
        "product_img": this.Thmp_list,
        "discount": this.Discount,
        "thumbnail_image":this.thumbnail_image,
        "related": '',
        "count": 0,
        "date_and_time": '' + new Date(),
        "mobile_type": 'Admin',
        "verification_status": "Not Verified",
        "status": true,
        "delete_status": false

      }
      console.log(a);
      this._api.product_details_edit(a).subscribe(
        (response: any) => {
          console.log(response);
          if (response.Code === 200) {
            //alert('Updated Successfully');
            this.showSuccess("Updated Successfully")
            this.ngOnInit();
            this.edit_t = false;
            this.id = undefined;
            this.Description = undefined;
            this.Thmp_list = [];
            this.img_path = undefined;
            this.Vendor = undefined;
            this.Category = undefined;
            this.Sub_Category = undefined;
            this.pettype = undefined;
            this.Age = undefined;
            this.Product_Name = undefined;
            this.Cost = undefined;
            this.Discount = undefined;
            this.threshould = undefined;
            this.petBreed = undefined;
            this.thumbnail_image = undefined;
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
      this._api.product_details_filter_date(a).subscribe(
        (response: any) => {
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
    this.listpettype(); this.E_Date = undefined; this.S_Date = undefined;
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }
  cancel() {
    this.edit_t = false;
    this.edit_t = false;
    this.id = undefined;
    this.Description = undefined;
    this.Thmp_list = [];
    this.img_path = undefined;
    this.Vendor = undefined;
    this.Category = undefined;
    this.Sub_Category = undefined;
    this.pettype = undefined;
    this.Age = undefined;
    this.Product_Name = undefined;
    this.Cost = undefined;
    this.Discount = undefined;
    this.threshould = undefined;
    this.petBreed = undefined;
  }

  addimg() {
    if (this.img_path != undefined) {
      this.Thmp_list.push(this.img_path);
      this.img_path = undefined
    }
    else {
      // alert("Please choose a image");
      this.showWarning("Please choose a image")
    }
  }
  deleteimg(dynamic, i) {
    for (let b = 0; b < this.Thmp_list.length; b++) {
      if (this.Thmp_list[b] == dynamic) {
        //this.Location_list[i].status="true";
        this.Thmp_list.splice(b, 1);
      }
    }
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
