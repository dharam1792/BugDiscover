import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfigService } from '../config';
import { BaseService } from '../base-service.service';
import { Validator } from "../shared/validator";

declare var $: any;

@Component({
  selector: 'app-newprogram',
  templateUrl: './newprogram.component.html',
  styleUrls: ['./newprogram.component.css'],
  providers: [BaseService]
})

export class LaunchnewProgramComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;

  userType: string = localStorage.getItem('userType');
  userProfile: any = localStorage.getItem('userProfile');


  isLoader: boolean = true;
  isSignup: boolean = false;

  ProgramForm: any = {};

  inScope: any[] = [{ category: '', targetDomain: '' }];
  outScope: any[] = [{ category: '', targetDomain: '' }];
  bountyType: any[] = [{ severity: '', type: '', reward: '' }];

  isRulesReadOnly: boolean = true;
  isPolicyReadOnly: boolean = true;

  isTabActive: Number = 1;
  minBountV: any = '';
  // arrArg =[1,1,1,1];
  categoryInscope = ['Website', 'Android', 'iOS', 'API', 'IOT', 'Cloud Services', 'Others'];
  categoryOutscope = ['Website', 'Android', 'iOS', 'API', 'IOT', 'Cloud Services', 'Others'];
  BountyCategory = ['Critical','High', 'Medium', 'Low', 'Info'];
  constructor(private zone:NgZone , public http: Http, public _config: ConfigService, public _baseService: BaseService, private fb: FormBuilder,
    private router: Router) {

    if (localStorage.getItem("token")) {
      this._baseService.getProfile();
    }
    else {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
    this.ProgramForm.programType = '';
    // console.log(this.uniqueArray());
  }

  setNoOfResearchers() {
    // this.ProgramForm.noTypeResearchers = '';
    this.ProgramForm.noTypeResearchers = '';
  }
  bountyMinArray = [];
  calMinBountyType() {
    for (let bounty of this.bountyType) {

      let val = parseInt(bounty.reward)

      if (!isNaN(val)) {
        this.bountyMinArray.push(val);
      }
    }
    console.log(Math.min.apply(Math, this.bountyMinArray));
    var aaa = Math.min.apply(Math, this.bountyMinArray);
    console.log(aaa);
    if (aaa == Infinity) {
      this.minBountV = 0;
    } else {
      this.minBountV = aaa;
    }

  }
 
  uniqueArray(arrArg) {
    
    return arrArg.filter(function(elem, pos,arr) {
      return arr.indexOf(elem) == pos;
    });
  };

  hidden(val) {
    let index = this.inScope.map(function (o) { return o.category; }).indexOf(val);
    if (index > -1) {
      return true;
    } else {
      return false
    }
    
  }
  outOfScopehidden(val){
    let index = this.outScope.map(function (o) { return o.category; }).indexOf(val);
    if (index > -1) {
      return true;
    } else {
      return false
    }
  }
  bountyhidden(val){
    let index = this.bountyType.map(function (o) { return o.severity; }).indexOf(val);
    if (index > -1) {
      return true;
    } else {
      return false
    }
  }


  hallofFame(selectedVal: boolean) {
    this.ProgramForm.hallofFame = selectedVal ? 1 : 0;
  }

  addMore(ItemType, val) {
    
    switch (ItemType) {
      case 'bountyType':
        {
          if (this.bountyType.length < 5 && this.bountyType[this.bountyType.length - 1].severity != '') {
            var bountyItem = { severity: '', type: '', reward: '' };
            this.bountyType.push(bountyItem);
          }

        }
        break;
      case 'outScope':
        {
          if (this.outScope[this.outScope.length - 1].category != '') {
            var outScope = { category: '', targetDomain: '' };
            this.outScope.push(outScope);
          }


        }
        break;
      case 'inScope':
        {


          if (this.inScope[this.inScope.length - 1].category != '') {

            let inScope1 = { category: '', targetDomain: '' };
            
            this.zone.run(() => {
              this.inScope.push(inScope1);
             });
            console.log(JSON.stringify(this.inScope));
          }

        }
        break;

    }

  }


  removeMore(ItemType, index) {

    switch (ItemType) {
      case 'bountyType':
        {
          this.bountyType.splice(index, 1);
        }
        break;
      case 'outScope':
        {
          this.outScope.splice(index, 1);
        }
        break;
      case 'inScope':
        {
 
          console.log(JSON.stringify(this.inScope));
          this.inScope.splice(index, 1);
          console.log(JSON.stringify(this.inScope));
        }
        break;

    }

  }

  tempBountyType = []

  setFormData() {

    this.ProgramForm.inScope = this.inScope;
    this.ProgramForm.outScope = this.outScope;
    this.ProgramForm.bountyType = this.bountyType;
    this.tempBountyType =[];
    for (let value of this.ProgramForm.bountyType) {
      this.tempBountyType.push(value.type);
    }
    this.tempBountyType =this.uniqueArray(this.tempBountyType);
    console.log (this.tempBountyType);
  }


  doSubmit() {


    var InScopeValue = [];
    var OutScopeValue = [];
    var BountyType = [];

    this.inScope.forEach(element => {
      if (element.category && element.targetDomain) {

        switch (element.category) {
          case 'Website':
            element.category = 1;
            break;
          case 'Android':
            element.category = 2;
            break;
          case 'iOS':
            element.category = 3;
            break;
          case 'API':
            element.category = 4;
            break;
          case 'IOT':
            element.category = 5;
            break;
          case 'Cloud Services':
            element.category = 6;
            break;
          case 'Others':
            element.category = 7;
            break;

        }
        InScopeValue.push(element);
      }
    });


    this.outScope.forEach(element => {
      if (element.category && element.targetDomain) {

        switch (element.category) {
          case 'Website':
            element.category = 1;
            break;
          case 'Android':
            element.category = 2;
            break;
          case 'iOS':
            element.category = 3;
            break;
          case 'API':
            element.category = 4;
            break;
          case 'IOT':
            element.category = 5;
            break;
          case 'Cloud Services':
            element.category = 6;
            break;
          case 'Others':
            element.category = 7;
            break;

        }
        OutScopeValue.push(element);
      }
    });


    this.bountyType.forEach(element => {
      if (element.severity && element.type && element.reward) {

        switch (element.severity) {
          case 'High':
            element.severity = 1;
            break;
          case 'Medium':
            element.severity = 2;
            break;
          case 'Low':
            element.severity = 3;
            break;
          case 'Info':
            element.severity = 4;
            break;

        }

        switch (element.type) {
          case 'Gift':
            element.type = 1;
            break;
          case 'Cash':
            element.type = 2;
            break;
          case 'Thanks':
            element.type = 3;
            break;

        }

        BountyType.push(element);
      }
    });

    this.ProgramForm.inScope = InScopeValue;
    this.ProgramForm.outScope = OutScopeValue;
    this.ProgramForm.bountyType = BountyType;


    var payLoad = this.ProgramForm;


    this.isLoader = true;

    this._baseService.addPrograms(payLoad).subscribe(
      (result: any) => {

        if (result) {

          console.log("Program was Submit Successfully");
          this.isLoader = false;
        }

      },
      (error) => {
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




  remove_duplicates(arr) {
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
      obj[arr[i]] = true;
    }
    arr = [];
    for (let key in obj) {
      arr.push(key);
    }
    return arr;
  }


  makeTabActive(TabID: any) {
    this.isTabActive = TabID;

  }


}
