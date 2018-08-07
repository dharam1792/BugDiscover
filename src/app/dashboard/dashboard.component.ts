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
import { DashboardService } from './dashboard.service';
import { AuthenticationService } from '../core/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //   userType: string = localStorage.getItem('userType');

  //   isLoader: boolean = true;
  //   userProfile: any = [];

  //   dashboardInfo: any = [];

  //   userForm: FormGroup; // <--- heroForm is of type FormGroup
  //   signInForm: FormGroup;

  //   key: string = 'program_id'; //set default
  //   reverse: boolean = false;

  //   activeTab: string = 'totalPrograms';

  //   searchText: any;
  //   //initializing p to one
  //   p: number = 1;

  //   isAccountActivated: boolean = true;

  //   constructor(public http: Http, public _config: ConfigService, public _baseService: BaseService, private fb: FormBuilder,
  //     private router: Router) {


  //     if (localStorage.getItem("token")) {
  //       this._baseService.getProfile();
  //       this.getDashboardInfo();
  //     }
  //     else {
  //       this.router.navigate(['/']);
  //     }


  //   }


  //   ngOnInit() {

  //   }


  //   sort(key) {
  //     this.key = key;
  //     this.reverse = !this.reverse;
  //   }
  //   filterResponse;
  //   makeFilter(filterVal) {
  // // alert(filterVal);
  // // console.log(JSON.stringify(this.dashboardInfo.tilesData[filterVal]));
  // this.filterResponse = this.dashboardInfo.tilesData[filterVal];
  // // console.log(JSON.stringify(this.filterResponse));


  //     switch (filterVal) {
  //       case 'Open Discover':
  //         this.searchText = { program_type: filterVal };
  //         break;
  //       case 'Private Discover':
  //         this.searchText = { program_type: filterVal };
  //         break;
  //       case 'Score':
  //         this.searchText = { score: filterVal };
  //         break;
  //       case 'Rewards':
  //         this.searchText = { rewards: filterVal };
  //         break;

  //       case 'Success Submissions':
  //         this.searchText = { submission_status: filterVal };
  //         break;
  //       case 'Total Submissions':
  //         this.searchText = { submission_status: filterVal };
  //         break;
  //       case 'ongoingPrograms':
  //         this.searchText = { program_status: filterVal };
  //         break;
  //       case 'Total Programs':
  //         this.searchText = "";
  //         break;

  //     }

  //     //  this.searchText = { program_type: filterVal };
  //   }


  //   async getProfile() {
  //     // alert();
  //     this.isLoader = true;
  //     this._baseService.getUserProfile().subscribe(
  //       (result: any) => {

  //         if (result) {
  //           this.userProfile = result;
  //           console.log(JSON.stringify(result));
  //           localStorage.setItem('userProfile', this.userProfile.personalInfo);

  //           this.isLoader = false;
  //         }

  //       }, (error) => {

  //         if (error.status === 401) {
  //           console.log("Token Expired");
  //           this.Logout();
  //         }
  //         else {
  //           this.isLoader = false;

  //           let errorval = error;

  //           let errorResponse = errorval.errors;

  //           if (errorResponse) {
  //             if (errorResponse.msg === 'Account Not Activated') {
  //               //code
  //               this.isAccountActivated = false;
  //             }
  //           }

  //         }



  //       }
  //     );

  //   }



  //   Logout() {
  //     localStorage.setItem('token', '');
  //     this.router.navigate(['/']);

  //   }


  //   async getDashboardInfo() {
  //     // alert();
  //     this.isLoader = true;
  //     this._baseService.getDashboardInfo().subscribe(
  //       (result: any) => {

  //         if (result) {


  //           if (this._config.isDummyData) {
  //             this.dashboardInfo = this._config.dummyData.dashboardInfo;
  //           }
  //           else {
  //             this.dashboardInfo = result;
  //           }
  //           console.log(JSON.stringify(this.dashboardInfo));
  //           if(this.userType == 'C'){
  //           this.filterByTableDAta('totalPrograms');
  //           }
  //           if(this.userType == 'R'){
  //             this.makeFilter('totalPrograms');
  //             }


  //           this.checkDashboardDataTable();

  //           this.isLoader = false;
  //         }


  //       }, (error) => {
  //         this.isLoader = false;
  //         if (error.status === 401) {
  //           console.log("Token Expired");
  //           this.Logout();
  //         }
  //       }
  //     );

  //   }



  //   checkDashboardDataTable() {
  //     if (this.dashboardInfo.programs) {


  //       for (let i = 0; i < this.dashboardInfo.programs.length; i++) {

  //         switch (this.dashboardInfo.programs[i].program_type) {
  //           case '1':
  //             this.dashboardInfo.programs[i].program_type = 'Open Discover';
  //             break;
  //           case '2':
  //             this.dashboardInfo.programs[i].program_type = 'Private Discover';
  //             break;
  //           default:
  //             break;
  //         }


  //         switch (this.dashboardInfo.programs[i].program_status) {
  //           case '1':
  //             this.dashboardInfo.programs[i].program_status = 'ongoing';
  //             break;
  //           case '2':
  //             this.dashboardInfo.programs[i].program_status = 'closed';
  //             break;
  //           default:
  //             break;
  //         }


  //         switch (this.dashboardInfo.programs[i].submission_status) {
  //           case '1':
  //             this.dashboardInfo.programs[i].submission_status = 'pending';
  //             break;
  //           case '2':
  //             this.dashboardInfo.programs[i].submission_status = 'approved';
  //             break;
  //           case '3':
  //             this.dashboardInfo.programs[i].submission_status = 'rejected';
  //             break;
  //           default:
  //             this.dashboardInfo.programs[i].submission_status = 'pending';
  //             break;
  //         }



  //       }

  //     }
  //   }





  //   //company
  //   filterByTableDAta(filtertype) {


  //     window.scrollTo(0, 700);


  //     switch (filtertype) {
  //       case 'totalPrograms':
  //         {
  //           this.dashboardInfo.programs = this.dashboardInfo.tilesData.totalPrograms;
  //           this.activeTab = 'totalPrograms';
  //         }
  //         break;
  //       case 'openDiscover':
  //         {
  //           this.dashboardInfo.programs = this.dashboardInfo.tilesData.openDiscover;
  //           this.activeTab = 'openDiscover';
  //         }
  //         break;
  //       case 'privateDiscover':
  //         {
  //           this.dashboardInfo.programs = this.dashboardInfo.tilesData.privateDiscover;
  //           this.activeTab = 'privateDiscover';
  //         }
  //         break;
  //       case 'bugResolved':
  //         {
  //           this.dashboardInfo.programs = this.dashboardInfo.tilesData.bugResolved;
  //           this.activeTab = 'bugResolved';
  //         }
  //         break;
  //       case 'inprogressSubmission':
  //         {
  //           this.dashboardInfo.programs = this.dashboardInfo.tilesData.inprogressSubmission;
  //           this.activeTab = 'inprogressSubmission';
  //         }
  //         break;
  //       case 'bugPending':
  //         {
  //           this.dashboardInfo.programs = this.dashboardInfo.tilesData.bugPending;
  //           this.activeTab = 'bugPending';
  //         }
  //         break;
  //         case 'submissionReceived':
  //         {
  //           this.dashboardInfo.programs = this.dashboardInfo.tilesData.submissionReceived;
  //           this.activeTab = 'submissionReceived';
  //         }
  //         break;
  //         case 'rewards':
  //         {
  //           this.dashboardInfo.programs = this.dashboardInfo.tilesData.rewards;
  //           this.activeTab = 'rewards';
  //         }
  //         break;
  //         default:
  //         {
  //           this.dashboardInfo.programs=[];
  //         }


  //     }

  isLoader: boolean = true;
  userType: any;
  userProfile: any = {};
  dashboardInfo: any = { tiles: {}, tilesData: {}};
  currentProgram: any [] = [];
  programList: any = {};
  p: number = 1;
  activeTab : any;

  constructor(
    private service: DashboardService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.userType = this.authService.credentials.userType;
    console.log('Credentials', this.authService.credentials)
    this.service.getProfile().subscribe(res =>{
      console.log("res",res);
      if(this.userType == 'R'){
        this.service.getResearcher().subscribe(resp =>{
          console.log("res Researcher",res);
          this.dashboardInfo = resp;
          this.programList = resp.tilesData;
          this.currentProgram = this.programList.totalPrograms;
          console.log()
        })
      } else if(this.userType == 'C'){
        this.service.getCompany().subscribe(resp =>{
          console.log("res Company",resp);
          this.dashboardInfo = resp;
          this.programList = resp.tilesData;
          this.activeTab = 'totalPrograms';
          this.currentProgram = this.programList.totalPrograms;
        })
      }
      this.userProfile = res.personalInfo;
      this.isLoader = false;
    }, error =>{
        const errMsg = error.json().errors.msg;
        window.alert(errMsg);
    })
  }

  makeFilter(data: any) {
    this.currentProgram = this.programList[data];
  }
  filterByTableDAta(data: any) {
    this.activeTab = data;
    this.currentProgram = this.programList[data];
  }
}
