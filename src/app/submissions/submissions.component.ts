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
import { SubmissionsService } from './submissions.service';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css']
})
export class SubmissionsComponent implements OnInit {


//   userType: string = localStorage.getItem('userType');
//   userProfile: any = localStorage.getItem('userProfile');
  
//   latestSubmissions: any = [];
//   isLoader: boolean = true;
//   showTable:any="totalSubmissions";

//   constructor(public http: Http, public _config: ConfigService, public _baseService: BaseService, private fb: FormBuilder,
//     private router: Router) {

//     if (localStorage.getItem("token")) {
//       this._baseService.getProfile();
//       this.getSubmissions();
//     }
//     else {
//       this.router.navigate(['dashboard']);
//     }

//   }

//   ngOnInit() {
//   }



//   async getSubmissions() {

//     this.isLoader=true;
   
//     this._baseService.getSubmissions().subscribe(
//       (result: any) => {
        
//         if (result) {
// // console.log(JSON.stringify(result));
//           if (this._config.isDummyData) {
//             this.latestSubmissions = this._config.dummyData.SubmissionData;
//           }
//           else {
//             this.latestSubmissions = result;
//           }

//         this.isLoader=false;

//         }

//       }, (error) => {
//         this.isLoader=false;
        
//       }
//     );

//   }





//   //company
//   filterByTableDAta(filtertype) {

//     switch (filtertype) {
//       case 'totalSubmissions':
//         {
//           this.showTable="totalSubmissions";;
//         }
//         break;
//       case 'completedCount':
//         {
//           this.showTable="completedCount";;
//         }
//         break;
//       case 'pendingCount':
//         {
//           this.showTable="pendingCount";;
//         }
//         break;
//       case 'inProgressCount':
//         {
//           this.showTable="inProgressCount";;
//         }
//         break;

//     }
//   }

  userType: any;
  isLoader: boolean = true;
  latestSubmissions: any = [];
  activeTab : any;

  constructor(
    private service: SubmissionsService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.userType = this.authService.credentials.userType;

    if(this.userType == 'R'){
      this.service.getSubmissions().subscribe(res =>{
        this.latestSubmissions = res;
        this.isLoader = false;
      }, err =>{
        this.authService.logout();
      });
    } else if(this.userType == 'C'){
      this.service.getCompanySubmissions().subscribe(res =>{
        this.latestSubmissions = res;
        this.activeTab = 'totalSubmissions';
        // this.currentProgram = this.programList.totalPrograms;
        this.isLoader = false;
      }, err =>{
        this.authService.logout();
      });
    }

  }

  filterByTableDAta(data: any) {
    this.activeTab = data;
    // this.currentProgram = this.programList[data];
  }

}
