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
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  apiUrl = environment.apiUrl;
  imgUrl = environment.imageURL;
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
  @ViewChild('imgType1', { static: false }) imgType: ElementRef;
  @ViewChild('imgType2', { static: false }) imgType2: ElementRef;

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
  thumbnail_image : any;
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
    console.log("list");
    this._api.product_details_list().subscribe(
      (response: any) => {
        console.log(response.Data);
        this.list = response.Data.reverse();
      }
    );
  }
  pettypelist() {
    this._api.pet_type_list().subscribe(
      (response: any) => {
        console.log(response.Data);
        this.rows = response.Data;
        this.pet_type_list = response.Data;
        console.log(this.pet_type_list);
      }
    );
  }
  listpetbreed() {
    this._api.pet_breed_list().subscribe(
      (response: any) => {
        console.log("breed list");
        console.log(response.Data);
        this.pet_breed_list = response.Data;
      }
    );
  }
  vendorlist() {
    this._api.vendor_details_list().subscribe(
      (response: any) => {
        console.log(response.Data);
        this.rows = response.Data;
        this.vendor_list = response.Data;
        console.log(this.vendor_list);
      }
    );
  }
  catagorieslist() {
    this._api.product_cate_list().subscribe(
      (response: any) => {
        console.log(response.Data);
        this.rows = response.Data;
        this.Catagories_list = response.Data;
        console.log(this.Catagories_list);
      }
    );
  }
  sub_cat_list() {
    this._api.product_subcat_list().subscribe(
      (response: any) => {
        console.log(response.Data);
        this.subcat_main = response.Data;

        console.log(this.subcat_main);
      }
    );
  }
  subcate() {
    console.log(this.Category);

    let a = this.subcat_main;
    this.sub_cate_list = a.filter((X: any) => this.Category.product_cate == X.product_categ)
    console.log(this.sub_cate_list);
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

  validation() {
    // if (this.threshould == '' || this.threshould == undefined || this.Thmp_list.length == 0 || this.Vendor == undefined || this.Category == undefined || this.pettype == undefined || this.Age == undefined || this.Product_Name == undefined || this.Product_Name == '' || this.Cost == undefined || this.Cost == '' || this.Discount == undefined || this.Discount == '' || this.Description == undefined || this.Description == '') {
    //   this.Validation = false;
    //   console.log(this.Validation)
    // }
    // else {
    //   this.Validation = true;
    //   console.log(this.Validation)
    // }
    this.Validation = true;
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
      console.log(obj1)
      for (let i = 0; i < this.pettype.length; i++) {
        obj2.push(this.pettype[i]._id)
      }
      console.log(obj2)
      for (let i = 0; i < this.Age.length; i++) {
        obj3.push(this.Age[i].y)
      }
      console.log(obj3)

      let a = {
        "user_id": this.Vendor._id,
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
        "status": true,
        "delete_status": false,
        "thumbnail_image":this.thumbnail_image || "",
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
            this.thumbnail_image = undefined;
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
        if (width !== 0 && height !== 0) {
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
        console.log(res);
        this.img_path = res.Data;
        this.imgType.nativeElement.value = "";

      });
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

  edit(item) {
    console.log(item);
    this.edit_t = true;
    this.id = item._id;
    let obj3 = [];
    console.log(item.age);
    for (let i = 0; i < item.age.length; i++) {
      obj3.push({ 'y': item.age[i] });
    }
    console.log(obj3);
    let arr1 = this.vendor_list;
    let arr2 = this.Catagories_list;
    this.Vendor = arr1.filter((x: any) => x._id == item.user_id)[0]
    this.Category = item.cat_id;
    this.thumbnail_image = item.thumbnail_image;
    console.log(this.Vendor);
    console.log(this.Category);

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
      console.log(obj1)
      for (let i = 0; i < this.pettype.length; i++) {
        obj2.push(this.pettype[i]._id)
      }
      console.log(obj2)
      for (let i = 0; i < this.Age.length; i++) {
        obj3.push(this.Age[i].y)
      }
      console.log(obj3)

      let a = {
        "_id": this.id,
        "user_id": this.Vendor._id,
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
        "status": true,
        "delete_status": false,
        "thumbnail_image":this.thumbnail_image || "",

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
            this.petBreed = undefined;

          } else {
            //alert(response.Message);
            this.showError(response.Message)
          }
        }
      );
    }
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
      this.showWarning("Please select the startdate and enddate");
      //alert('Please select the startdate and enddate');
    }

  }
  refersh() {
    this.listpettype(); this.E_Date = undefined; this.S_Date = undefined;
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      console.log(this.uploadedFiles)
    }

    // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }


  addimg() {
    if (this.img_path != undefined) {
      this.Thmp_list.push(this.img_path);
      this.img_path = undefined
      console.log(this.Thmp_list);
    }
    else {
      // alert("Please choose a image");
      this.showWarning("Please choose a image")
    }
  }
  deleteimg(dynamic, i) {
    console.log(dynamic, i, this.Thmp_list)
    for (let b = 0; b < this.Thmp_list.length; b++) {
      if (this.Thmp_list[b] == dynamic) {
        //this.Location_list[i].status="true";
        this.Thmp_list.splice(b, 1);
      }
      console.log(this.Thmp_list);
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


  showSuccess(msg) {
    this.toastr.successToastr(msg);
  }

  showError(msg) {
      this.toastr.errorToastr(msg);
  }

  showWarning(msg) {
      this.toastr.warningToastr(msg);
  }


      //////Additional Calling Funcation//////
      fileupload2(event) {
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
            if (width !== 0 && height !== 0) {
              let d = this.selectedimgae.size / 100000;
              if (d < 10) {
                this.addfiles2();
              } else {
                //alert('Please upload the file below 1 MB');
                this.showWarning("Please upload the file below 1 MB");
                this.imgType2.nativeElement.value = "";
              }
            }
            else {
              this.showWarning("Please upload the file size 200 * 200");
              // alert('Please upload the file size 100 * 100');
              this.imgType2.nativeElement.value = "";
            }
          };
          img.src = fr.result as string; // The data URL
        };
        fr.readAsDataURL(this.selectedimgae);
        // clear the value after upload
      }


      addfiles2() {
        const fd = new FormData();
        fd.append('sampleFile', this.selectedimgae, this.selectedimgae.name);
        this.http.post(this.imgUrl , fd)
          .subscribe((res: any) => {
            console.log(res);
            this.thumbnail_image = res.Data;
            this.imgType.nativeElement.value = "";
          });
      }


}

