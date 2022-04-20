import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isUserLoggedIn;
  private username;

  constructor( private router: Router,) {
    this.isUserLoggedIn = false;
 
  }
  gUserLoggedIn():void {
    this.isUserLoggedIn = false;
    // this.router.navigate(['login']);
  }
  setUserLoggedIn() {
    this.isUserLoggedIn = true;
  }

  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }}
