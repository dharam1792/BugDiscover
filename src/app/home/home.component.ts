import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfigService } from '../config';
import { BaseService } from '../base-service.service';
import { debug } from 'util';
import { AuthGuard } from '../authGuard.service';

declare var jQuery: any;
// declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [BaseService]
})
export class HomeComponent implements OnInit {

  isLoader: boolean = true;
  isSignup: boolean = false;
  showMsgCompany: boolean = false;
  // public user: any;

  userForm: FormGroup; // <--- heroForm is of type FormGroup
  signInForm: FormGroup;

  companyForm: FormGroup;
  signInFormCompany: FormGroup;

  responseMsg: any;
  forgotEmailbind: string;

  forgotpasswordmsg: any;
  constructor(public http: Http, public _config: ConfigService, public _baseService: BaseService, private fb: FormBuilder,
    private router: Router, private AuthGuard: AuthGuard) {

    this.AuthGuard.isLogedin = false;
    // Swal('Hello world!');
    this.createForm();

    // if (localStorage.getItem("token")) {
    //   this.router.navigate(['dashboard']);
    // }

  }

 

  openModalForgotPassword() {
    // this.forgotpassword.reset();
    this.forgotEmailbind = '';
    jQuery('#myModal').modal('show');

  }


  ngOnInit() {
    // this._baseService.userType = '';
    // localStorage.setItem('userType', '');
    setTimeout(() => {
      document.getElementById("pswrd").focus();
      document.getElementById("email").focus();

    }, 200);

  }



  createForm() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
    }, { validator: this.checkIfMatchingPasswords('password', 'confirmPassword') });


    this.companyForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(3)]],
      registrationName: ['', [Validators.required, Validators.minLength(3)]],
      designation: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
    }, { validator: this.checkIfMatchingPasswords('password', 'confirmPassword') });


    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.signInFormCompany = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });


  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  async SignUp() {
    // //alert("SignUp");
    localStorage.setItem('token', '');

    let postData = {
      "username": this.userForm.value.username,
      "fullname": this.userForm.value.fullname,
      "email": this.userForm.value.email,
      "password": this.userForm.value.password,
    }


    this._baseService.makeSignUp(postData).subscribe(
      (result: any) => {

        this.responseMsg = result;

        this.userForm.reset();
        setTimeout(() => {
          this.isSignup = false;
          this.responseMsg = "";
        }, 3000);

      },
      (error) => {

        let errorval = error;

        let errorResponse = errorval.errors;

        if (errorResponse) {
          if (errorResponse.email) {
            //code
            this.responseMsg = { "success": false, "message": errorResponse.email.msg ? errorResponse.email.msg : '', SignupType: "R" };
          }
          else if (errorResponse.username) {
            //code
            this.responseMsg = { "success": false, "message": errorResponse.username.msg ? errorResponse.username.msg : '', SignupType: "R" };
          }
          // setTimeout(()=> {
          //   this.responseMsg = "";
          // }, 5000);
        }


      }
    );

  }

  async CompanySignUp() {
    // alert("CompanySignUp");
    let postData = {
      "companyName": this.companyForm.value.companyName,
      "email": this.companyForm.value.email,
      "registrarName": this.companyForm.value.registrationName,
      "designation": this.companyForm.value.designation,
      "password": this.companyForm.value.password,
      "confirmPassword": this.companyForm.value.confirmPassword,
    }

    // console.log("##@@"+JSON.stringify(postData));


    this._baseService.makeSignUpCompany(postData).subscribe(
      (result: any) => {
        // console.log("@@##"+JSON.stringify(result));
        this.responseMsg = result;
        this.companyForm.reset();


        setTimeout(() => {
          this.isSignup = false;
          this.responseMsg = "";
        }, 3000);

      },
      (error) => {

        let errorval = error;

        let errorResponse = errorval.errors;


        if (errorResponse) {
          if (errorResponse.email) {
            this.responseMsg = { "success": false, "message": errorResponse.email.msg ? errorResponse.email.msg : '', SignupType: "C" };
          }
          else if (errorResponse.registrarName) {
            this.responseMsg = { "success": false, "message": errorResponse.registrarName.msg ? errorResponse.registrarName.msg : '', SignupType: "C" };
          }
          else if (errorResponse.designation) {
            this.responseMsg = { "success": false, "message": errorResponse.designation.msg ? errorResponse.designation.msg : '', SignupType: "C" };
          }
          else if (errorResponse.companyName) {
            this.responseMsg = { "success": false, "message": errorResponse.companyName.msg ? errorResponse.companyName.msg : '', SignupType: "C" };
          }


          // setTimeout(()=> {
          //   this.responseMsg = "";
          // }, 5000);

        }




      }
    );

  }

  async SignIn() {
    //alert("SignIn");
    localStorage.setItem('token', '');

    let postData = {
      "email": this.signInForm.value.email,
      "password": this.signInForm.value.password,
    }

    this._baseService.makeSignin(postData).subscribe(
      (result: any) => {

        if (result) {
          console.log(result);
          // alert(result.success);
          if (result.success != false) {
            this.AuthGuard.isLogedin = true;
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('userType', result.data.userType);
            localStorage.setItem('userID', result.data.userid);
            localStorage.setItem('refreshToken', result.data.refreshToken);
            this.router.navigate(['dashboard']);
          } else {
            // alert("dnbkdsjf");
            this.loginIssue = 'Login with company signin tab.';

            setTimeout(() => {
              this.loginIssue = "";
            }, 5000);
          }


        }

      },
      (error) => {

        if (error.status === 400) {
          //code
        }
        else {
          this.responseMsg = error;

          // setTimeout(()=> {
          //   this.responseMsg = "";
          // }, 5000);

        }
      }
    );

  }
  loginIssue;
  async SignInCompany() {
    localStorage.setItem('token', '');

    let postData = {
      "email": this.signInFormCompany.value.email,
      "password": this.signInFormCompany.value.password,
    }


    this._baseService.makeSigninCompany(postData).subscribe(
      (result: any) => {

        if (result) {
          if (result.success != false) {
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('userType', result.data.userType);
            localStorage.setItem('userID', result.data.userid);
            this.router.navigate(['dashboard']);
          } else {
            this.loginIssue = 'Login with researcher signin tab.';
            setTimeout(() => {
              this.loginIssue = "";
            }, 5000);
          }


        }

      },
      (error) => {
        debugger;

        if (error.status === 400) {
          //code
        }
        else {
          this.responseMsg = error;

          // setTimeout(()=> {
          //   this.responseMsg = "";
          // }, 5000);

        }
      }
    );

  }


  forgotpassword() {
    // alert();
    let postData = { "email": this.forgotEmailbind };
    console.log(postData);
    this._baseService.forgotPassword(postData).subscribe(
      (result: any) => {

        if (result) {

          this.forgotpasswordmsg = "New password sent to your mail Id";
          setTimeout(() => {
            this.forgotpasswordmsg = '';
            jQuery('#myModal').modal('hide');
          }, 200);
        }
      },
      (error) => {

      }
    );
  }



}
