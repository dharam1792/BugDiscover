import { Component, OnInit } from '@angular/core';
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
import { HallOfFameService } from './hall-of-fame.service';
import { DashboardService } from '../dashboard/dashboard.service';
 

@Component({
  selector: 'app-hall-of-fame',
  templateUrl: './hall-of-fame.component.html',
  styleUrls: ['./hall-of-fame.component.css']
})
export class HallOfFameComponent implements OnInit {

  // userType: string = localStorage.getItem('userType');
  // userProfile: any = localStorage.getItem('userProfile');


  // isLoader: boolean = true;
  // HallofFame: any = [];
  // userProfileInfo: any = [];
  // ShowUser: boolean = false;

  // userForm: FormGroup; // <--- heroForm is of type FormGroup
  // signInForm: FormGroup;

  // key: string = 'program_id'; //set default
  // reverse: boolean = false;

  // searchText: any;
  // orderByField: any = "";
  // orderByFieldmyhall: string = "";
  // searchTextformyhall: string = "";
  // companyInfo;
  // selectedUser: string;
  // //initializing p to one
  // p: number = 1;


  // constructor(public http: Http, public _config: ConfigService, public _baseService: BaseService, private fb: FormBuilder,
  //   private router: Router) {


  //   if (localStorage.getItem("token")) {
  //     this.getHallofFame();
  //     this._baseService.isNewHallofFame = true;
  //   }
  //   else {
  //     this.router.navigate(['dashboard']);
  //   }



  // }


  // ngOnInit() {


  // }


  // async getHallofFame() {

  //   this.isLoader = true;

  //   this._baseService.getHallofFame().subscribe(
  //     (result: any) => {

  //       if (result) {
  //         console.log("@@@" + JSON.stringify(result));

  //         if (this._config.isDummyData) {
  //           this.HallofFame = this._config.dummyData.HallofFame;
  //         }
  //         else {
  //           this.HallofFame = result;
  //         }

  //         this.isLoader = false;

  //       }

  //     }, (error) => {
  //       this.isLoader = false;

  //     }
  //   );

  // }



  // async getUserByID(UserID, usertype) {

  //   this.isLoader = true;

  //   if (usertype == 'halloffame') {
  //     this.selectedUser = 'halloffame';
  //     this._baseService.getUserByID(UserID).subscribe(
  //       (result: any) => {

  //         if (result) {
  //           this.userProfileInfo = result;
  //           console.log("getUserByID"+JSON.stringify(result))

  //           this._baseService.isNewHallofFame = false;

  //           this.isLoader = false;
  //         }

  //       }, (error) => {
  //         this.isLoader = false;
  //       }
  //     );
  //   } else {
  //     this.selectedUser = 'myhalloffame';
      // this._baseService.getCompanyDetailsByID(UserID).subscribe(
  //       (result: any) => {

  //         if (result) {
  //           this.companyInfo = result;
  //           console.log("getCompanyDetailsByID"+JSON.stringify(result))

  //           this._baseService.isNewHallofFame = false;

  //           this.isLoader = false;
  //         }

  //       }, (error) => {
  //         this.isLoader = false;
  //       }
  //     );
  //   }







  // }


  // backToMain() {

  //   // this.ShowUser=false;
  //   this._baseService.isNewHallofFame = true;
  // }

  halloffame: any = [];
  myhalloffame: any = [];
  isNewHallofFame: boolean = true;
  userProfileInfo: any;
  companyInfo: any;
  selectedUser: any;
  isLoader: boolean = true;

  searchText: any;
  orderByField: any = "";
  orderByFieldmyhall: string = "";
  searchTextformyhall: string = "";

  constructor(
    private service: HallOfFameService,
    private profileService: DashboardService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.service.getHallOfFame().subscribe(res =>{
      console.log('Hall of fame', res);
      this.halloffame = res.halloffame;
      this.myhalloffame = res.myhalloffame;
      this.isLoader = false;
    }, err =>{
      this.authService.logout();
    })
    console.log("hello this.halloffame", this.halloffame);
    this.profileService.getProfile().subscribe(res =>{
      console.log(res);
      this.isLoader = false;
    }, err =>{
      this.authService.logout();
    })
  }

  getUserByID(id: any, userType: any){
    this.isLoader = true;
    if(userType == 'halloffame'){
      this.selectedUser = userType;
      this.service.getUserById(id).subscribe(res =>{
        this.userProfileInfo = res;
        this.isNewHallofFame = false;
        this.isLoader = false;
      })
    } else if(userType == 'myhalloffame'){
      this.selectedUser = userType;
      this.service.getCompanyById(id).subscribe(res =>{
        this.companyInfo = res;
        console.log("companyInfo",res)
        this.isNewHallofFame = false;
        this.isLoader = false;
      })
    }
  }

  backToMain(){
    this.isNewHallofFame = true;
  }

}
