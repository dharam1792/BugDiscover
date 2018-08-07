import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MyAccountService } from './my-account.service';
import { AuthenticationService } from '../core/auth/auth.service';
import { Validator } from '../shared/validator';

export class certificateItem {
  certificate: any;
  license: any;
}

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  @Output() ProfileUpdate = new EventEmitter();

  userType: any;

  isTabActive = 1;
  isSubTabActive = 1;

  isLoader: boolean = true;
  userProfileInfo: any = {};
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

  public userName: AbstractControl;
  public fullName: AbstractControl;
  public email: AbstractControl;
  public skype: AbstractControl;
  public phone: AbstractControl;
  public website: AbstractControl;
  public socialLinks: AbstractControl;
  public achivements: AbstractControl;
  public hallOfFame: AbstractControl;
  public certificates: AbstractControl;
  public aboutMe: AbstractControl;
  public profileImageUrl: any;
  public designation: AbstractControl;
  public score: AbstractControl;


  public CompanyName: AbstractControl;
  public RegistararName: AbstractControl;
  public RegistararDesignation: AbstractControl;

  ChangePasswordForm: FormGroup;

  public oldPassword: AbstractControl;
  public password: AbstractControl;
  public confirmPassword: AbstractControl;

  passwordMismatch: any;

  certificatesList: any[] = [];
  addEnable: boolean = false;
  editEnable: boolean = true;
  itemIndex: any;

  isFileUploadLoader: boolean = false;

  userPrivacy: any = [];
  personalInfo: any;

  btnTaxt: string = 'Upload Photo';

  constructor(
    public service: MyAccountService,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) {
    this.userType = this.authService.credentials.userType;
    this.createForm();
    this.getUserPrivacy();




    setTimeout(() => {
      this.isSubTabActive == 1;
    }, 3000);


  }



  ngOnInit() {
  }

  AddCertificates(index: any) {
    if(index >= 0){
      let newItem = new certificateItem;
      newItem.certificate = this.certificatesList[index].certificate;
      newItem.license = this.certificatesList[index].license;
      this.certificatesList[index] = newItem;
      console.log(this.certificatesList);
      this.addEnable = false;
      this.editEnable = true;
      this.itemIndex = null;
    } else {
    this.itemIndex = this.certificatesList.length;
    this.addEnable = true;
    this.editEnable = false;
    let newItem = new certificateItem;
    this.certificatesList.push(newItem);
    }
  }

  editCertificates(index :any){
    this.addEnable = true;
    this.editEnable = false;
    this.itemIndex = index;
  }


  createForm() {


    if (this.userType == 'R') {
      this.ProfileForm = this.fb.group({
        'userName': ['', Validators.compose([Validators.required])],
        'fullName': ['', Validators.compose([Validators.required])],
        'email': ['', Validators.compose([Validators.required])],
        'skype': ['', Validators.compose([Validators.required])],
        'phone': ['', Validators.compose([Validators.required])],
        'website': ['', Validators.compose([Validators.required])],
        'socialLinks': ['', Validators.compose([Validators.required])],
        'achivements': ['', Validators.compose([Validators.required])],
        'hallOfFame': ['', Validators.compose([Validators.required])],
        'certificates': [''],
        'aboutMe': ['', Validators.compose([Validators.required])]
      });
      this.userName = this.ProfileForm.controls['userName'];
      this.fullName = this.ProfileForm.controls['fullName'];
      this.email = this.ProfileForm.controls['email'];
      this.skype = this.ProfileForm.controls['skype'];
      this.phone = this.ProfileForm.controls['phone'];
      this.website = this.ProfileForm.controls['website'];
      this.socialLinks = this.ProfileForm.controls['socialLinks'];
      this.achivements = this.ProfileForm.controls['achivements'];
      this.hallOfFame = this.ProfileForm.controls['hallOfFame'];
      this.certificates = this.ProfileForm.controls['certificates'];
      this.aboutMe = this.ProfileForm.controls['aboutMe'];
    }
    else if (this.userType == 'C') {

      this.ProfileFormCompany = this.fb.group({
        // CompanyName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')]],
        // RegistararName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')]],
        // RegistararDesignation: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')]],
        // aboutMe: ['', [Validators.required, Validators.minLength(50)]],
        // email: ['', [Validators.required, Validators.email]],
        // phone: ['', Validators.required],
        // website: ['', Validators.required],
        // socialLinks: ['', Validators.required],
        'CompanyName': ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')])],
        'RegistararName': ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')])],
        'RegistararDesignation': ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')])],
        'aboutMe': ['', Validators.compose([Validators.required, Validators.minLength(50)])],
        'email': ['', Validators.compose([Validators.required])],
        'phone': ['', Validators.compose([Validators.required])],
        'website': ['', Validators.compose([Validators.required])],
        'socialLinks': ['', Validators.compose([Validators.required])]
      });
      this.CompanyName = this.ProfileFormCompany.controls['CompanyName'];
      this.RegistararName = this.ProfileFormCompany.controls['RegistararName'];
      this.RegistararDesignation = this.ProfileFormCompany.controls['RegistararDesignation'];
      this.aboutMe = this.ProfileFormCompany.controls['aboutMe'];
      this.email = this.ProfileFormCompany.controls['email'];
      this.phone = this.ProfileFormCompany.controls['phone'];
      this.website = this.ProfileFormCompany.controls['website'];
      this.socialLinks = this.ProfileFormCompany.controls['socialLinks'];
    }


    this.ChangePasswordForm = this.fb.group({
      'oldpassword': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      'confirmPassword': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
    this.oldPassword = this.ChangePasswordForm.controls['oldPassword'];
    this.password = this.ChangePasswordForm.controls['password'];
    this.confirmPassword = this.ChangePasswordForm.controls['confirmPassword'];

    this.confirmPassword.valueChanges.subscribe(val =>{
      if(this.password.value == val){
        this.passwordMismatch = '';
      } else {
        this.passwordMismatch = 'Password and Confirm Password did not match';
      }
    })

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


    this.service.changePassowrd(postData).subscribe(
      (result: any) => {
        const res = result.json()
        if(res.errors){
          this.responseMsg = { "success": false, "message": res.errors.msg };
        } else {
          this.responseMsg = { "success": true, "message": 'Password updated successfully.' };
        }

        // this.ChangePasswordForm.reset();
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


    this.service.ChangeProfilePicture(formDataVal).subscribe(
      (result: any) => {

        if (result) {

          this.isFileUploadLoader = false;
          this.getUserProfile();
          this.service.getProfile().subscribe(res => {
            console.log(res);
          });

        }

      },
      (error) => {

        this.getUserProfile();
        this.service.getProfile().subscribe(res => {
          console.log(res);
        });

        //  console.log("Change Profile Image Failed");
        this.isFileUploadLoader = false;

        if (error.status === 401) {
          console.log("Token Expired");
          this.authService.logout();
        }

      }
    );

  }
  async getUserProfile() {

    this.isLoader = true;

    this.service.getProfile().subscribe(
      (result: any) => {

        if (result) {
          this.userProfileInfo = result.personalInfo;
          let len = result.loginActivity.length;
          let j = 0;
          for (let i = len - 1; i >= len - 10; i--){
            this.loginActivity[j] = (result.loginActivity[i]);
            j++;
          }
          console.log('Login Activity ', this.loginActivity)
          // this.certificatesList = result.personalInfo.certificates;
          this.EditForm();

          this.isLoader = false;
        }

      }, (error) => {
        this.isLoader = false;

        if (error.status === 401) {
          console.log("Token Expired");
          this.authService.logout();
        }


      }
    );

  }

  async getUserPrivacy() {

    this.isLoader = true;

    this.service.getPrivacy().subscribe(
      (result: any) => {


        // console.log(JSON.stringify(result));

        if (result) {
          result.forEach(element => {
            if(element.property == 'username'){

            } else {
              this.userPrivacy.push(element);
            }
          });
          this.isLoader = false;
          console.log(this.userProfileInfo);
        }

      }, (error) => {
        this.isLoader = false;

        if (error.status === 401) {
          console.log("Token Expired");
          // this.Logout();
          this.authService.logout();
        }


      }
    );
    this.getUserProfile();

  }


  // Logout() {
  //   localStorage.setItem('token', '');
  //   this.router.navigate(['/']);

  // }




  EditForm() {

    if (this.userType == 'R') {
      this.userName.setValue(this.userProfileInfo.userName);
      this.fullName.setValue(this.userProfileInfo.fullName);
      this.email.setValue(this.userProfileInfo.email);
      this.skype.setValue(this.userProfileInfo.skype);
      this.phone.setValue(this.userProfileInfo.phone);
      this.website.setValue(this.userProfileInfo.website);
      this.socialLinks.setValue(this.userProfileInfo.socialLinks);
      this.achivements.setValue(this.userProfileInfo.achivements);
      this.hallOfFame.setValue(this.userProfileInfo.hallOfFame);
      this.aboutMe.setValue(this.userProfileInfo.aboutMe);

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
      this.CompanyName.setValue(this.userProfileInfo.companyName);
      this.RegistararName.setValue(this.userProfileInfo.registrarName);
      this.RegistararDesignation.setValue(this.userProfileInfo.designation);
      this.aboutMe.setValue(this.userProfileInfo.aboutMe);
      this.email.setValue(this.userProfileInfo.email);
      this.phone.setValue(this.userProfileInfo.phone);
      this.website.setValue(this.userProfileInfo.website);
      this.socialLinks.setValue(this.userProfileInfo.socialLinks);

    }


  }


  doSubmit() {
    var payLoad = {};

    if (this.userType == 'R') {
      for (let i in this.ProfileForm.controls) {
        if (this.ProfileForm.controls[i]) {
          this.ProfileForm.controls[i].markAsTouched();
        }
      }

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
        id: this.authService.credentials.userid
      }

    }
    else if (this.userType == 'C') {
      for (let i in this.ProfileFormCompany.controls) {
        if (this.ProfileFormCompany.controls[i]) {
          this.ProfileFormCompany.controls[i].markAsTouched();
        }
      }
      payLoad = {
        companyName: this.ProfileFormCompany.value.CompanyName,
        registrarName: this.ProfileFormCompany.value.RegistararName,
        designation: this.ProfileFormCompany.value.RegistararDesignation,
        aboutMe: this.ProfileFormCompany.value.aboutMe,
        email: this.ProfileFormCompany.value.email,
        phone: [this.ProfileFormCompany.value.phone],
        website: [this.ProfileFormCompany.value.website],
        socialLinks: [this.ProfileFormCompany.value.socialLinks],
        id: this.authService.credentials.userid
      }

    }

    if(this.userType == 'R') {
      if(this.ProfileForm.valid){
        this.service.updateProfile(payLoad).subscribe(
          (result: any) => {
    
            if (result) {
    
              this.responseMsg = result;
              this.isSubTabActive = 1;
              this.service.getProfile().subscribe(res => {
                console.log(res);
              });
    
              this.getUserProfile();
              this.responseMsg = { "success": true, "message": 'You have successfull updated your profile.' };
    
    
    
            }
    
          },
          (error: any) => {
            if (error.status === 401) {
              console.log("Token Expired");
              this.authService.logout();
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
    } else {
      if(this.ProfileFormCompany.valid){
        this.service.updateProfile(payLoad).subscribe(
          (result: any) => {
    
            if (result) {
    
              this.responseMsg = result;
              this.isSubTabActive = 1;
              this.service.getProfile().subscribe(res => {
                console.log(res);
              });
    
              this.getUserProfile();
              this.responseMsg = { "success": true, "message": 'You have successfull updated your profile.' };
    
    
    
            }
    
          },
          (error: any) => {
            if (error.status === 401) {
              console.log("Token Expired");
              this.authService.logout();
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
    }




  }


  removeCertificates(index) {
    this.certificatesList.splice(index, 1);
    this.editEnable = true;

  }

  // onFilterChange(event:any,selectedItem:any) {
  //     
  //     console.log('filter change called');
  //   }


  checkValue(event: any) {


    var privacyObject: any = {};
    this.userPrivacy.forEach(element => {

      let label = element.property;
      let privacy = element.privacy;

      switch (label) {
        case 'email':
          privacyObject.email = privacy ? 1 : 0;
          break;
        case 'username':
          privacyObject.username = privacy ? 1 : 0;
          break;
        case 'fullname':
          privacyObject.fullname = privacy ? 1 : 0;
          break;
        case 'skypeID':
          privacyObject.skypeID = privacy ? 1 : 0;
          break;
        case 'phone':
          privacyObject.phone = privacy ? 1 : 0;
          break;
        case 'website':
          privacyObject.website = privacy ? 1 : 0;
          break;
        case 'socialLinks':
          privacyObject.socialLinks = privacy ? 1 : 0;
          break;
        case 'achivements':
          privacyObject.achivements = privacy ? 1 : 0;
          break;
        case 'halloffame':
          privacyObject.halloffame = privacy ? 1 : 0;
          break;
        case 'certificates':
          privacyObject.certificates = privacy ? 1 : 0;
          break;
        case 'usernote':
          privacyObject.usernote = privacy ? 1 : 0;
          break;
        case 'companyname':
          privacyObject.companyname = privacy ? 1 : 0;
          break;
        case 'designation':
          privacyObject.designation = privacy ? 1 : 0;
          break;
        case 'photo':
          privacyObject.photo = privacy ? 1 : 0;
          break;

      }

    });

    console.log(privacyObject);


    this.service.updatePrivacy(privacyObject).subscribe(
      (result: any) => {

        if (result) {

        }

      },
      (error) => {

        if (error.status === 401) {
          console.log("Token Expired");
          this.authService.logout();
        }

      }
    );

  }

}
