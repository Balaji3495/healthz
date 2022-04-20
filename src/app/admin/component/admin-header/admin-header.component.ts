import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  displayBasic: boolean;
  constructor(

    private router: Router,

    private http: HttpClient,

    @Inject(SESSION_STORAGE) private storage: StorageService


  ) { }

  ngOnInit(): void {
  }
  showBasicDialog() {
    this.displayBasic = true;
}

logout(){
  this.router.navigateByUrl('');
  this.saveInLocal("login_status", false);
}
saveInLocal(key, val): void {
  this.storage.set(key, val);
}

getFromLocal(key): any {
  return this.storage.get(key);
}
}
