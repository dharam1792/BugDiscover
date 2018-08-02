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
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  userType: string = localStorage.getItem('userType');
  userProfile: any = localStorage.getItem('userProfile');

  @Output() ProfileUpdate = new EventEmitter();

  isTabActive = 1;
  isSubTabActive = 1;

  isLoader: boolean = true;
  userProfileInfo: any = [];
  loginActivity: any = [];

  ProfileForm: FormGroup;
  previewImageSRC: any = '';
  selectedFile: any;

  ProfileFormCompany: FormGroup;

  key: string = 'program_id'; //set default
  reverse: boolean = false;

  searchText: any;
  //initializing p to one
  p: number = 1;

  responseMsg: any;

  userName: FormControl;
  fullName: FormControl;
  email: FormControl;
  skype: FormControl;
  phone: FormControl;
  website: FormControl;
  socialLinks: FormControl;
  achivements: FormControl;
  hallOfFame: FormControl;
  certificates: FormControl;
  aboutMe: FormControl;
  profileImageUrl: any;
  designation: FormControl;
  score: FormControl;

  
  CompanyName: FormControl;
  RegistararName: FormControl;
  RegistararDesignation: FormControl;

  ChangePasswordForm: FormGroup;

  certificatesList: any[] = [
    {
      "certificate": "",
      "license": ""
    }
  ];

  isFileUploadLoader: boolean = false;

  userPrivacy: any = [];


  btnTaxt:string = 'Upload Photo';

  constructor(public http: Http, public _config: ConfigService, public _baseService: BaseService, private fb: FormBuilder,
    private router: Router) {


    if (localStorage.getItem("token")) {
      this.getUserProfile();
      this._baseService.getProfile();
    }
    else {
      this.router.navigate(['dashboard']);
    }

    this.createForm();
    this.getUserPrivacy();




    setTimeout(() => {
      this.isSubTabActive == 1;
    }, 3000);


  }



  ngOnInit() {
  }

  AddCertificates() {
    var certificateItem = {
      "certificate": "",
      "license": ""
    };

    this.certificatesList.push(certificateItem);
  }



  createForm() {


    if (this.userType == 'R') {
      this.ProfileForm = this.fb.group({
        userName: ['', Validators.required],
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        skype: ['', Validators.required],
        phone: ['', Validators.required],
        website: ['', Validators.required],
        socialLinks: ['', Validators.required],
        achivements: ['', Validators.required],
        hallOfFame: ['', Validators.required],
        // certificates: ['', Validators.required],
        aboutMe: ['', Validators.required],
      });
    }
    else if (this.userType == 'C') {

      this.ProfileFormCompany = this.fb.group({
        CompanyName: ['', [Validators.required,Validators.pattern('[a-zA-Z0-9 ]+')]],
        RegistararName: ['',[ Validators.required,Validators.pattern('[a-zA-Z0-9 ]+')]],
        RegistararDesignation: ['', [ Validators.required,Validators.pattern('[a-zA-Z0-9 ]+')]],
        aboutMe: ['', [Validators.required,Validators.minLength(50)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        website: ['', Validators.required],
        socialLinks: ['', Validators.required],
      });

    }


    this.ChangePasswordForm = this.fb.group({
      oldpassword: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
    }, { validator: this.checkIfMatchingPasswords('password', 'confirmPassword') });



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

  ChangePassword() {

    let postData = {
      "oldpassword": this.ChangePasswordForm.value.oldpassword,
      "password": this.ChangePasswordForm.value.password,
    }


    this._baseService.changePassowrd(postData).subscribe(
      (result: any) => {

        this.responseMsg = result;

        this.ChangePasswordForm.reset();
        setTimeout(() => {
          this.responseMsg = "";
        }, 3000);

      },
      (error) => {

        let errorval = error;

        let errorResponse = errorval.errors;

        // if (errorResponse) {
        //   if (errorResponse.oldpassword) {
        //     //code
        //     this.responseMsg = { "success": false, "message": errorResponse.email.message ? errorResponse.email.msg : '', SignupType: "R" };
        //   }
        //   else if (errorResponse.password) {
        //     //code
        //     this.responseMsg = { "success": false, "message": errorResponse.username.message ? errorResponse.username.msg : '', SignupType: "R" };
        //   }
        //   // setTimeout(()=> {
        //   //   this.responseMsg = "";
        //   // }, 5000);
        // }


      }
    );

  }


  makeTabActive(TabID: any) {
    this.isTabActive = TabID;
    this.isSubTabActive = 1;
  }



  onFileChange(event) {

    this.isFileUploadLoader = true;

    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.btnTaxt = 'change or remove photo';
        this.selectedFile = file;

        // this.previewImageSRC = e.target.result;
        // this.profileImageUrl = this.previewImageSRC;

        if (this.selectedFile) {

          var formData = new FormData();
          formData.append('profileImage', this.selectedFile);

          this.ChangeProfilePic(formData);


        }
      };
    }


  }


  ChangeProfilePic(formDataVal) {


    this._baseService.ChangeProfilePicture(formDataVal).subscribe(
      (result: any) => {

        if (result) {

          this.isFileUploadLoader = false;
          this.getUserProfile();
          this._baseService.getProfile();

          setTimeout(() => {
            // this.ProfileUpdate.emit(this.userProfileInfo);
          }, 500);
          //  console.log("Change Profile Image Successfully");

        }

      },
      (error) => {

        this.getUserProfile();
        this._baseService.getProfile();

        //  console.log("Change Profile Image Failed");
        this.isFileUploadLoader = false;

        if (error.status === 401) {
          console.log("Token Expired");
          this.Logout();
        }

      }
    );

  }
  async getUserProfile() {

    this.isLoader = true;

    this._baseService.getUserProfile().subscribe(
      (result: any) => {

        if (result) {

          if (this._config.isDummyData) {
            this.userProfileInfo = this._config.dummyData.MyProfile;
            this.loginActivity = result.loginActivity;
          }
          else {
            this.userProfileInfo = result.personalInfo;
            this.loginActivity = result.loginActivity;
          }
// console.log("@@@"+JSON.stringify(this.userProfileInfo));


          this.EditForm();

          this.isLoader = false;
        }

      }, (error) => {
        this.isLoader = false;

        if (error.status === 401) {
          console.log("Token Expired");
          this.Logout();
        }


      }
    );

  }

  async getUserPrivacy() {

    this.isLoader = true;

    this._baseService.getUserPrivacy().subscribe(
      (result: any) => {

          
        // console.log(JSON.stringify(result));

        if (result) {

          if (this._config.isDummyData) {
            this.userPrivacy = this._config.dummyData.MyProfile;
            //this.loginActivity = result.loginActivity;
          }
          else {
            this.userPrivacy = result;
            //  this.loginActivity = result.loginActivity;
          }
// console.log("%%%%%"+JSON.stringify(this.userPrivacy));
          this.isLoader = false;
        }

      }, (error) => {
        this.isLoader = false;

        if (error.status === 401) {
          console.log("Token Expired");
          this.Logout();
        }


      }
    );

  }


  Logout() {
    localStorage.setItem('token', '');
    this.router.navigate(['/']);

  }




  EditForm() {

    if (this.userType == 'R') {
      this.ProfileForm.controls['userName'].setValue(this.userProfileInfo.userName);
      this.ProfileForm.controls['fullName'].setValue(this.userProfileInfo.fullName);
      this.ProfileForm.controls['email'].setValue(this.userProfileInfo.email);
      this.ProfileForm.controls['skype'].setValue(this.userProfileInfo.skype);
      this.ProfileForm.controls['phone'].setValue(this.userProfileInfo.phone);
      this.ProfileForm.controls['website'].setValue(this.userProfileInfo.website);
      this.ProfileForm.controls['socialLinks'].setValue(this.userProfileInfo.socialLinks);
      this.ProfileForm.controls['achivements'].setValue(this.userProfileInfo.achivements);
      this.ProfileForm.controls['hallOfFame'].setValue(this.userProfileInfo.hallOfFame);
      this.ProfileForm.controls['aboutMe'].setValue(this.userProfileInfo.aboutMe);

      if (this.userProfileInfo.certificates) {
        if (this.userProfileInfo.certificates.length > 0) {
          this.certificatesList = [];
          for (let i = 0; i < this.userProfileInfo.certificates.length; i++) {

            this.certificatesList.push(this.userProfileInfo.certificates[i]);
          }
        }
      }

    }
    else if (this.userType == 'C') {
      this.ProfileFormCompany.controls['CompanyName'].setValue(this.userProfileInfo.companyName);
      this.ProfileFormCompany.controls['RegistararName'].setValue(this.userProfileInfo.registrarName);
      this.ProfileFormCompany.controls['RegistararDesignation'].setValue(this.userProfileInfo.designation);
      this.ProfileFormCompany.controls['aboutMe'].setValue(this.userProfileInfo.aboutMe);
      this.ProfileFormCompany.controls['email'].setValue(this.userProfileInfo.email);
      this.ProfileFormCompany.controls['phone'].setValue(this.userProfileInfo.phone);
      this.ProfileFormCompany.controls['website'].setValue(this.userProfileInfo.website);
      this.ProfileFormCompany.controls['socialLinks'].setValue(this.userProfileInfo.socialLinks);

    }


  }


  doSubmit() {


    var payLoad = {};

    if (this.userType == 'R') {

      var certificateListData = [];

      this.certificatesList.forEach(element => {
        if (element.certificate && element.license) {
          certificateListData.push(element);
        }
      });

      payLoad = {
        fullname: this.ProfileForm.value.fullName,
        skypeID: this.ProfileForm.value.skype,
        phone: this.ProfileForm.value.phone,
        website: [this.ProfileForm.value.website],
        socialLinks: [this.ProfileForm.value.socialLinks],
        achivements: [this.ProfileForm.value.achivements],
        halloffame: [this.ProfileForm.value.hallOfFame],
        certificates: certificateListData,
        usernote: this.ProfileForm.value.aboutMe,
        id: localStorage.getItem("userID")
      }

    }
    else if (this.userType == 'C') {
      payLoad = {
        companyName: this.ProfileFormCompany.value.CompanyName,
        registrarName: this.ProfileFormCompany.value.RegistararName,
        designation: this.ProfileFormCompany.value.RegistararDesignation,
        aboutMe: this.ProfileFormCompany.value.aboutMe,
        email: this.ProfileFormCompany.value.email,
        phone: [this.ProfileFormCompany.value.phone],
        website: [this.ProfileFormCompany.value.website],
        socialLinks: [this.ProfileFormCompany.value.socialLinks],
        id: localStorage.getItem("userID")
      }

    }

    this._baseService.updateProfile(payLoad).subscribe(
      (result: any) => {

        if (result) {

          this.responseMsg = result;
          this.isSubTabActive = 1;
          this._baseService.getProfile();

          this.getUserProfile();
          this.responseMsg = { "success": true, "message": 'You have successfull updated your profile.' };



        }

      },
      (error: any) => {
        if (error.status === 401) {
          console.log("Token Expired");
          this.Logout();
        }
        else {
          let errorval = error;

          let errorResponse = errorval.errors;

          if (errorResponse) {
            this.responseMsg = { "success": false, "message": 'Profile Updated Failed..' };
          }
          // if (errorResponse.email || errorResponse.username) {
          //   //code
          //   this.responseMsg = { "success": false, "message": errorResponse.email.msg ? errorResponse.email.msg : errorResponse.username.msg };
          // }
          // console.log("Update Profile Sumbitter failed");
        }

      }
    );




  }


  removeCertificates(index) {
    this.certificatesList.splice(index, 1);

  }

  // onFilterChange(event:any,selectedItem:any) {
  //     
  //     console.log('filter change called');
  //   }


  checkValue(event: any) {
      

    var privacyObject:any = {};
    this.userPrivacy.forEach(element => {

      let label = element.property;
      let privacy = element.privacy;

      switch (label) {
        case 'email':
          privacyObject.email = privacy?1:0;
          break;
        case 'username':
          privacyObject.username = privacy?1:0;
          break;
        case 'fullname':
          privacyObject.fullname = privacy?1:0;
          break;
        case 'skypeID':
          privacyObject.skypeID = privacy?1:0;
          break;
        case 'phone':
          privacyObject.phone = privacy?1:0;
          break;
        case 'website':
          privacyObject.website = privacy?1:0;
          break;
        case 'socialLinks':
          privacyObject.socialLinks = privacy?1:0;
          break;
        case 'achivements':
          privacyObject.achivements = privacy?1:0;
          break;
        case 'halloffame':
          privacyObject.halloffame = privacy?1:0;
          break;
        case 'certificates':
          privacyObject.certificates = privacy?1:0;
          break;
        case 'usernote':
          privacyObject.usernote = privacy?1:0;
          break;
        case 'companyname':
          privacyObject.companyname = privacy?1:0;
          break;
        case 'designation':
          privacyObject.designation = privacy?1:0;
          break;
        case 'photo':
          privacyObject.photo = privacy?1:0;
          break;

      }

    });

    console.log(privacyObject);

    
    this._baseService.updatePrivacy(privacyObject).subscribe(
      (result: any) => {

        if (result) {

        }

      },
      (error) => {

        if (error.status === 401) {
          console.log("Token Expired");
          this.Logout();
        }

      }
    );

  }

}
