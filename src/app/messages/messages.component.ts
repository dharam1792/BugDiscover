import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ConfigService } from '../config';
import { BaseService } from '../base-service.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  userType: string = localStorage.getItem('userType');
  userProfile: any = localStorage.getItem('userProfile');

  @Output() ProfileUpdate = new EventEmitter();

  isTabActive = 1;
  isSubTabActive = 1;

  isLoader: boolean = false;
  ViewMsgDetail: boolean = false;

  searchText: any;
  responseMsg: any;
  replyMsg: any;
  replyMsg2: any;
  selectedMsgID: any;

  InboxMessages: any = [];
  latestMessages: any = [];
  SentMessages: any = [];
  TrashMessages:any = [];
  SupportMessages:any=[];


  checkedMSG:any=[];

  constructor(public http: Http, public _config: ConfigService, public _baseService: BaseService, private fb: FormBuilder,
    private router: Router) {

    debugger;

    if (localStorage.getItem("token")) {
      // this._baseService.getMessages();
      this.getAllMessagesInbox();
      this.getAllMessagesSent();
      this.getAllMessagesTrash();
      this.getAllMessagesSupport();
    }
    else {
      this.router.navigate(['dashboard']);
    }

    setTimeout(() => {
      this.isSubTabActive == 1;
    }, 3000);


  }


  ngOnInit() {

    // if (localStorage.getItem("token")) {
    //   this._baseService.getMessages();
    // }
    // else {
    //   this.router.navigate(['dashboard']);
    // }

  }


  makeTabActive(TabID: any) {
    this.isTabActive = TabID;
    this.isSubTabActive = 1;
  }


  Logout() {
    localStorage.setItem('token', '');
    this.router.navigate(['/']);

  }

  selChk(val:any) {
   
    var index =  this.checkedMSG.indexOf(val);
    if(index === -1){
      this.checkedMSG.push(val);
    }else{
      this.checkedMSG.splice(index,1);
    }
   }

  async getAllMessagesInbox() {

    this.isLoader = true;

    this._baseService.getMessages('Inbox').subscribe(
      (result: any) => {

        debugger;

        if (result) {

          if (this._config.isDummyData) {
            this.InboxMessages = this._config.dummyData.MessageInboxData;
          }
          else {
            this.InboxMessages = result;
          }

          this.isLoader = false;

        }

      }, (error) => {
        this.isLoader = false;

      }
    );

  }


  async getAllMessagesSent() {

    this.isLoader = true;

    this._baseService.getMessages('Sent').subscribe(
      (result: any) => {

        debugger;

        if (result) {

          if (this._config.isDummyData) {
            this.SentMessages = this._config.dummyData.MessageInboxData;
          }
          else {
            this.SentMessages = result;
          }

          this.isLoader = false;

        }

      }, (error) => {
        this.isLoader = false;

      }
    );

  }

  async getAllMessagesTrash() {

    this.isLoader = true;

    this._baseService.getMessages('Trash').subscribe(
      (result: any) => {

        debugger;

        if (result) {

          if (this._config.isDummyData) {
            this.TrashMessages = this._config.dummyData.MessageInboxData;
          }
          else {
            this.TrashMessages = result;
          }

          this.isLoader = false;

        }

      }, (error) => {
        this.isLoader = false;

      }
    );

  }


  async getAllMessagesSupport() {

    this.isLoader = true;

    this._baseService.getMessages('Inbox').subscribe(
      (result: any) => {

        debugger;

        if (result) {

          if (this._config.isDummyData) {
            this.SupportMessages = this._config.dummyData.SupportMessageListData;
          }
          else {
            this.SupportMessages = result;
          }

          this.isLoader = false;

        }

      }, (error) => {
        this.isLoader = false;

      }
    );

  }
  
  closeMsg() {
    this.ViewMsgDetail = false;
  }
  viewMsg(msgID: any) {
    this.ViewMsgDetail = true;
    this.selectedMsgID = msgID;

    this._baseService.getMessagesByID(msgID).subscribe(
      (result: any) => {

        debugger;

        if (result) {
          if (this._config.isDummyData) {
            this.latestMessages = this._config.dummyData.MessageListData;
          }
          else {
            this.latestMessages = result;
          }

          this.isLoader = false;

        }

      }, (error) => {
        this.isLoader = false;

      }
    );

  }


  sendMsg() {


    let msgObject = {
      "message": this.replyMsg
    };

    this._baseService.sendMessagesByID(this.selectedMsgID, msgObject).subscribe(
      (result: any) => {

        debugger;

        if (result) {
          this.viewMsg(this.selectedMsgID);
        }

      }, (error) => {
        this.isLoader = false;

      }
    );

  }


  sendMsg2() {
debugger;

    let msgObject = {
      "message": this.replyMsg2
    };

    this._baseService.sendMessagesToSupport(msgObject).subscribe(
      (result: any) => {

        debugger;

        if (result) {
          this.viewMsg(this.selectedMsgID);
        }

      }, (error) => {
        this.isLoader = false;

      }
    );

  }



  deleteMsg() {

    let msgObject = {
      "messageid": this.checkedMSG
    };

    this._baseService.deleteMessagesByID(msgObject).subscribe(
      (result: any) => {

        debugger;

        if (result) {
          this.viewMsg(this.selectedMsgID);
        }

      }, (error) => {
        this.isLoader = false;

      }
    );

  }


  // doSubmit() {

  //   var payLoad = {};

  //   if (this.userType == 'R') {

  //     var certificateListData = [];

  //     this.certificatesList.forEach(element => {
  //       if (element.certificate && element.license) {
  //         certificateListData.push(element);
  //       }
  //     });

  //     payLoad = {
  //       fullname: this.ProfileForm.value.fullName,
  //       skypeID: this.ProfileForm.value.skype,
  //       phone: this.ProfileForm.value.phone,
  //       website: [this.ProfileForm.value.website],
  //       socialLinks: [this.ProfileForm.value.socialLinks],
  //       achivements: [this.ProfileForm.value.achivements],
  //       halloffame: [this.ProfileForm.value.hallOfFame],
  //       certificates: certificateListData,
  //       usernote: this.ProfileForm.value.aboutMe,
  //       id: localStorage.getItem("userID")
  //     }

  //   }
  //   else if (this.userType == 'C') {
  //     payLoad = {
  //       companyName: this.ProfileFormCompany.value.CompanyName,
  //       registrarName: this.ProfileFormCompany.value.RegistararName,
  //       designation: this.ProfileFormCompany.value.RegistararDesignation,
  //       aboutMe: this.ProfileFormCompany.value.aboutMe,
  //       email: this.ProfileFormCompany.value.email,
  //       phone: [this.ProfileFormCompany.value.phone],
  //       website: [this.ProfileFormCompany.value.website],
  //       socialLinks: [this.ProfileFormCompany.value.socialLinks],
  //       id: localStorage.getItem("userID")
  //     }

  //   }

  //   this._baseService.updateProfile(payLoad).subscribe(
  //     (result: any) => {

  //       if (result) {

  //         this.responseMsg = result;
  //         this.isSubTabActive=1;
  //         this._baseService.getProfile();
  //         this.responseMsg = { "success": true, "message": 'You have successfull updated your profile.' };



  //       }

  //     },
  //     (error: any) => {
  //       if (error.status === 401) {
  //         console.log("Token Expired");
  //         this.Logout();
  //       }
  //       else {
  //         let errorval = error;

  //         let errorResponse = errorval.errors;

  //         if (errorResponse) {
  //           this.responseMsg = { "success": false, "message": 'Profile Updated Failed..' };
  //         }
  //         // if (errorResponse.email || errorResponse.username) {
  //         //   //code
  //         //   this.responseMsg = { "success": false, "message": errorResponse.email.msg ? errorResponse.email.msg : errorResponse.username.msg };
  //         // }
  //         // console.log("Update Profile Sumbitter failed");
  //       }

  //     }
  //   );




  // }



}
