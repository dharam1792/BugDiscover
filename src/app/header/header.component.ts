import { Component, OnInit, Input, EventEmitter, OnChanges } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfigService } from '../config';
import { BaseService } from '../base-service.service';
import { AuthenticationService } from '../core/auth/auth.service';
import { DashboardService } from '../dashboard/dashboard.service';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() ProfileUpdate: any;


  userType: string = this.authService.credentials.userType;
  userProfile:  any = {};

  constructor(
    public http: Http, 
    public _config: ConfigService, 
    public _baseService: BaseService, 
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private dashboardService: DashboardService
  ) {
      
      // if (localStorage.getItem("token")) {
      //   this._baseService.getProfile();
      // }
      // else {
      //   this.router.navigate(['dashboard']);
      // }

    }

  ngOnInit() {
    this.dashboardService.getProfile().subscribe(res =>{
      this.userProfile = res.personalInfo;
      console.log(this.userProfile, 'User Profile')
    })
  }

alertMsg(){
  alert("We are evolving so this page will up.");
}
  Logout(){
    // localStorage.setItem('token', '');
    // alert("you are now signed out");
    // this.router.navigate(['loggedOut']);
    this.authService.logout();
    
  }

  // stateChangeFunc(data: any)
  // {
  //  this.ro
  // }

}
