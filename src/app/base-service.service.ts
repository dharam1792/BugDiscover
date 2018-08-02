import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ConfigService } from './config';
import { Router } from '@angular/router';

@Injectable()
export class BaseService {

  userType: string = localStorage.getItem('userType') ? localStorage.getItem('userType') : "";

  userProfile: any;

  isNewHallofFame: boolean = true;


  constructor(private _http: Http, public _config: ConfigService, private router: Router) {
    // this.userType= '';
    // alert(this.userType);
    this.getProfile();

  }



  //Set Header Options
  _apiHeader() {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'JWT ' + localStorage.getItem("token"));

    let options = new RequestOptions({ headers: headers });
    return options;

  }



  //common Post Method
  _apiPostData(apiURI: any, body: any, options: any) {


    return this._http.post(apiURI, body, options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);

  }

  //common Post Method
  _apiPutData(apiURI: any, body: any, options: any) {

    return this._http.put(apiURI, body, options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);

  }

  //common Get Method
  _apiGetData(apiURI: any, options: any) {

    return this._http.get(apiURI, options)
      .map((response: Response) => response.json())
      .catch(this.errorHandler)

  }

  //Error Handler
  errorHandler(error: Response) {
    console.log(JSON.stringify(error));
    if (error.status == 401) {
      // localStorage.setItem('token',localStorage.getItem('refreshToken'));
      // console.log(localStorage.getItem('token'));
      // location.reload();
      this.router.navigate(['loggedOut']);
    } else {
      alert("oops, something's gone wrong");
    }
    return Observable.throw(error.json());
  }



  makeSignUp(PostData) {

    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });


    return this._apiPostData(this._config.BaseUrl + this._config.SignupURI, PostData, options);


  }

  makeSignUpCompany(PostData) {

    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });


    return this._apiPostData(this._config.BaseUrl + this._config.SignupURICompany, PostData, options);


  }


  submitReport(PostData) {

    let headers = new Headers();
    // headers.append('Content-Type', 'multipart/form-data');
    headers.append('Authorization', 'JWT ' + localStorage.getItem("token"));
    let options = new RequestOptions({ headers: headers });

// console.log("@@@@@");
// console.log("@@@@@");
    return this._apiPostData(this._config.BaseUrl + 'bug', PostData, options);


  }


  forgotPassword(PostData) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._apiPostData(this._config.BaseUrl +'forgotpassword/', PostData, options);

  }


  makeSignin(PostData) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    // console.log(this._config.BaseUrl + this._config.SigninURI+';'+JSON.stringify(PostData)+':'+JSON.stringify(options));
    return this._apiPostData(this._config.BaseUrl + this._config.SigninResearcherURI, PostData, options);


  }
  makeSigninCompany(PostData) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    // console.log(this._config.BaseUrl + this._config.SigninURI+';'+JSON.stringify(PostData)+':'+JSON.stringify(options));
    return this._apiPostData(this._config.BaseUrl + this._config.SigninCompanyURI, PostData, options);


  }

  public getUserProfile() {

    let options = this._apiHeader();
    // 
    if (localStorage.getItem("token")) {
      return this._apiGetData(this._config.BaseUrl + this._config.GetProfileInfo, options);
    } else {
      return Observable.throw({});
    }



  }





  public getDashboardInfo() {

    let options = this._apiHeader();

    let requestURL = "";

    this.userType = localStorage.getItem('userType') ? localStorage.getItem('userType') : "";

    if (this.userType == 'R') {
      // alert();
      requestURL = this._config.BaseUrl + this._config.GetDashboardInfo;
    }
    else if (this.userType == 'C') {

      requestURL = this._config.BaseUrl + this._config.GetDashboardInfoCompany;
    }


    return this._apiGetData(requestURL, options);


  }



  public getHallofFame() {

    let options = this._apiHeader();

    let requestURL = "";

    if (this.userType == 'R') {
      requestURL = this._config.BaseUrl + this._config.GetHallofFame;
    }
    else if (this.userType == 'C') {
      requestURL = this._config.BaseUrl + this._config.GetHallofFameCompany;
    }

    return this._apiGetData(requestURL, options);


  }



  public getUserByID(UserID) {

    let options = this._apiHeader();

    return this._apiGetData(this._config.BaseUrl + this._config.GetProfileInfo + UserID, options);


  }

  public getCompanyDetailsByID(CmpID) {

    let options = this._apiHeader();

    return this._apiGetData(this._config.BaseUrl + 'program/' + CmpID, options);


  }
  public getUserPrivacy() {

    let options = this._apiHeader();

    return this._apiGetData(this._config.BaseUrl + this._config.UserProfilePrivacy, options);


  }


  postZeroDiscover(PostData) {

    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem("token"));
    let options = new RequestOptions({ headers: headers });

    return this._apiPostData(this._config.BaseUrl + this._config.AddZeroDiscover, PostData, options);


  }


  addPrograms(PostData) {

    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem("token"));
    let options = new RequestOptions({ headers: headers });

    return this._apiPostData(this._config.BaseUrl + this._config.AddProgramsCompany, PostData, options);


  }


  updateProfile(PostData) {



    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'JWT ' + localStorage.getItem("token"));

    let options = new RequestOptions({ headers: headers });
    // console.log(JSON.stringify(PostData))
    // console.log(JSON.stringify(headers))
    let requestURL = "";

    if (this.userType == 'R') {
      requestURL = this._config.BaseUrl + 'user/researcher/profile/';
    }
    else if (this.userType == 'C') {

      requestURL = this._config.BaseUrl + 'user/company/profile/';
    }
    // alert("inside");
    console.log(this._apiPutData(requestURL, PostData, options));
    return this._apiPutData(requestURL, PostData, options);


  }


  ChangeProfilePicture(PostData) {

    // let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
    // headers.append('Authorization', 'JWT ' + localStorage.getItem("token"));
    // let options = new RequestOptions({ headers: headers });

    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem("token"));

    let options = new RequestOptions({ headers: headers });

    //  let userID = localStorage.getItem("userID");

    return this._apiPutData(this._config.BaseUrl + this._config.ChangeProfilePicture, PostData, options);


  }


  changePassowrd(PostData) {

    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem("token"));

    let options = new RequestOptions({ headers: headers });


    return this._apiPutData(this._config.BaseUrl + this._config.ChangePassword, PostData, options);

  }



  activateProfile(token) {

    var requesturl = this._config.BaseUrl + this._config.ActivateProfile + token;

    return this._apiGetData(requesturl, '');

  }




  public getPrograms() {

    let options = this._apiHeader();

    let requestURL = "";

    if (this.userType == 'R') {
      requestURL = this._config.BaseUrl + this._config.GetAllPrograms;
    }
    else if (this.userType == 'C') {
      requestURL = this._config.BaseUrl + this._config.GetAllProgramsCompany;
    }

    return this._apiGetData(requestURL, options);


  }


  public getProgramDetails(id) {

    let options = this._apiHeader();

    let requestURL = "";

    if (this.userType == 'R') {
      requestURL = this._config.BaseUrl + 'program/' + id;
    }
    else if (this.userType == 'C') {

      requestURL = this._config.BaseUrl + 'program/' + id;
    }

    return this._apiGetData(requestURL, options);


  }



  public getHallOfFame(id) {

    let options = this._apiHeader();

    let requestURL = "";

    if (this.userType == 'R') {
      requestURL = this._config.BaseUrl + 'halloffame/program/' + id;
    }
    else if (this.userType == 'C') {

      requestURL = this._config.BaseUrl + 'halloffame/program/' + id;
    }

    return this._apiGetData(requestURL, options);


  }


  public cancelProgram(id) {

    let options = this._apiHeader();

    let requestURL = "";

    let data = {};

    if (this.userType == 'R') {
      requestURL = this._config.BaseUrl + 'program/leave/' + id;
    }
    else if (this.userType == 'C') {

      requestURL = this._config.BaseUrl + 'program/leave/' + id;
    }

    return this._apiPostData(requestURL, data, options);



  }

  public getParticipateOrJoinPrograms(id) {

    let options = this._apiHeader();

    let requestURL = "";
    let data = {};
    requestURL = this._config.BaseUrl + 'program/join/' + id;
    return this._apiPostData(requestURL, data, options);
    // return this._apiGetData(requestURL, options);


  }


  public getSubmissions() {

    let options = this._apiHeader();

    let requestURL = "";

    if (this.userType == 'R') {
      requestURL = this._config.BaseUrl + this._config.GetSubmissionReports;
    }
    else if (this.userType == 'C') {
      requestURL = this._config.BaseUrl + this._config.GetSubmissionReportsCompany;
    }

    return this._apiGetData(requestURL, options);


  }





  async getProfile() {

    this.getUserProfile().subscribe(
      (result: any) => {

        if (result) {
          this.userProfile = result.personalInfo;

          localStorage.setItem('userProfile', this.userProfile.personalInfo);


        }

      }, (error) => {

        if (error.status === 401) {
          console.log("Token Expired");
        }
        else {
          let errorval = error;

          let errorResponse = errorval.errors;

          if (errorResponse) {
            if (errorResponse.msg === 'Account Not Activated') {
              //code
            }
          }

        }



      }
    );

  }



  public getMessages(Type: any) {

    let options = this._apiHeader();

    let requestURL = "";

    if (this.userType == 'R') {
      // requestURL = this._config.BaseUrl + this._config.GetAllMessages;
    }
    else if (this.userType == 'C') {

      if (Type == "Inbox")
        requestURL = this._config.BaseUrl + this._config.GetAllMessagesInbox;
      else if (Type == "Sent")
        requestURL = this._config.BaseUrl + this._config.GetAllMessagesSent;
      else if (Type == "Trash")
        requestURL = this._config.BaseUrl + this._config.GetAllMessagesTrash;


    }

    return this._apiGetData(requestURL, options);


  }



  public getMessagesByID(msgID: any) {

    let options = this._apiHeader();

    let requestURL = "";

    if (this.userType == 'R') {
      requestURL = this._config.BaseUrl + this._config.GetAllMessagesByID;
    }
    else if (this.userType == 'C') {
      requestURL = this._config.BaseUrl + this._config.GetAllMessagesByID + "/" + msgID;
    }

    return this._apiGetData(requestURL, options);


  }


  sendMessagesByID(msgID: any, PostData: any) {

    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem("token"));
    let options = new RequestOptions({ headers: headers });

    let requestURL = "";
    if (this.userType == 'R') {
      requestURL = this._config.BaseUrl + this._config.GetAllMessagesByID;
    }
    else if (this.userType == 'C') {
      requestURL = this._config.BaseUrl + this._config.GetAllMessagesByID + "/" + msgID;
    }


    return this._apiPostData(requestURL, PostData, options);


  }




  deleteMessagesByID(PostData: any) {

    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem("token"));
    let options = new RequestOptions({ headers: headers });

    let requestURL = "";
    if (this.userType == 'R') {
      requestURL = this._config.BaseUrl + this._config.GetAllMessagesByID;
    }
    else if (this.userType == 'C') {
      requestURL = this._config.BaseUrl + this._config.GetAllMessagesByID;
    }


    return this._apiPostData(requestURL, PostData, options);


  }


  sendMessagesToSupport(PostData: any) {

    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem("token"));
    let options = new RequestOptions({ headers: headers });

    let requestURL = "";
    if (this.userType == 'R') {
      requestURL = this._config.BaseUrl + this._config.postSupportMessage;
    }
    else if (this.userType == 'C') {
      requestURL = this._config.BaseUrl + this._config.postSupportMessage;
    }

    return this._apiPostData(requestURL, PostData, options);


  }



  updatePrivacy(PostData) {

    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem("token"));

    let options = new RequestOptions({ headers: headers });


    return this._apiPutData(this._config.BaseUrl + this._config.UserProfilePrivacy, PostData, options);


  }



  //Rewards

  public getRewards() {

    let options = this._apiHeader();

    return this._apiGetData(this._config.BaseUrl + this._config.GetAllRewards, options);


  }


}
