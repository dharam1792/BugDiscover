import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  selector: 'app-zero-discover',
  templateUrl: './zero-discover.component.html',
  styleUrls: ['./zero-discover.component.css'],
  providers: [BaseService]
})
export class ZeroDiscoverComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;

  userType: string = localStorage.getItem('userType');
  userProfile: any = localStorage.getItem('userProfile');


  isLoader: boolean = true;
  isSignup: boolean = false;

  zeroDiscoverForm: FormGroup;
  previewImageSRC: any = '';
  selectedFile: any;
  severity: any = [];
  Identified: any;

  isTabActive: Number = 1;
  isShowAutomateTool: boolean = false;


  // av: any = 'AV:';
  // ac: any = 'AC:';
  // pr: any = 'PR:';
  // ui: any = 'UI:';
  // s: any = 'S:';
  // c: any = 'C:';
  // i: any = 'I:';
  // a: any = 'A:';


  av: any = '';
  ac: any = '';
  pr: any = '';
  ui: any = '';
  s: any = '';
  c: any = '';
  i: any = '';
  a: any = '';

  totalScore: any = 0;


  oldAV_isVisited: boolean = false;
  oldac_isVisited: boolean = false;
  oldpr_isVisited: boolean = false;
  oldui_isVisited: boolean = false;
  olds_isVisited: boolean = false;
  oldc_isVisited: boolean = false;
  oldi_isVisited: boolean = false;
  olda_isVisited: boolean = false;

  oldAV: any = 0;
  oldac: any = 0;
  oldpr: any = 0;
  oldui: any = 0;
  olds: any = 0;
  oldc: any = 0;
  oldi: any = 0;
  olda: any = 0;
  description: any;


  constructor(public http: Http, public _config: ConfigService, public _baseService: BaseService, private fb: FormBuilder,
    private router: Router) {




    if (localStorage.getItem("token")) {
      this.createForm();
      this._baseService.getProfile();
    }
    else {
      this.router.navigate(['dashboard']);
    }


    // if (localStorage.getItem("token")) {
    //   this.router.navigate(['dashboard']);
    // }

    console.log(this.getBaseVector());

    let BaseVector = this.getBaseVector();


  }

  ngOnInit() {
  }


  getBaseVector() {
    var av = 'AV:P';
    var ac = 'AC:H';
    var pr = 'PR:H';
    var ui = 'UI:R';
    var s = 'S:U';
    var c = 'C:N';
    var i = 'I:N';
    var a = 'A:N';
    return "CVSS:3.0/" + av + '/' + ac + '/' + pr + '/' + ui + '/' + s + '/' + c + '/' + i + '/' + a;
  }


  urls = new Array<string>();
  detectFiles(event) {
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
  }

  createForm() {
    this.zeroDiscoverForm = this.fb.group({
      vulnerablityTitle: ['', Validators.required],
      vendorName: ['', Validators.required],
      threadDesc: ['', Validators.required],
      description: ['', Validators.required],
      automatedTool: [''],
      score: [''],
      images: ['', Validators.required],
      severity: ['', Validators.required],
      Identified: ['1']
    });
    this.onValueChanged(); // (re)set validation messages now

  }


  onValueChanged(data?: any) {
    if (!this.zeroDiscoverForm) { return; }
    // this.formErrors = this.validator.validate(this.zeroDiscoverForm);
  }


  goback() {
    this.makeTabActive(1);
    this.zeroDiscoverForm.reset();
    this.zeroDiscoverForm.value.images = '';
    this.previewImageSRC = "";

    this.av = '';
    this.ac = '';
    this.pr = '';
    this.ui = '';
    this.s = '';
    this.c = '';
    this.i = '';
    this.a = '';


  }
  doSubmit() {

    var formData = new FormData();
 

    for (let value of Object.keys(this.zeroDiscoverForm.value)) {
      formData.append(value, this.zeroDiscoverForm.value[value]);
    }
    this.isLoader = true;


 

    this._baseService.postZeroDiscover(formData).subscribe(
      (result: any) => {

        if (result) {
          this.makeTabActive(3);
          console.log("Zero discover form Submit Successfully");
          this.isLoader = false;
          this.urls = [];
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

  onFileChange(event) {

    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        // this.zeroDiscoverForm.value.images.setValue({
        //   filename: file.name,
        //   filetype: file.type,
        //   value: reader.result.split(',')[1]
        // })

        this.selectedFile = file;

        this.previewImageSRC = e.target.result;
        this.zeroDiscoverForm.value.images = this.previewImageSRC;

      };
    }


  }


  handleChange(evt) {

    var target = evt.target;


    if (target.value == 'Manual') {
      if (target.checked) {
        this.zeroDiscoverForm.value.Identified = target.value
        this.isShowAutomateTool = false;
      }
      else {
        this.zeroDiscoverForm.value.Identified = 'Automated Tool';
        this.isShowAutomateTool = true;
      }
    }
    else {
      if (target.checked) {
        this.zeroDiscoverForm.value.Identified = target.value
        this.isShowAutomateTool = true;
      } else {
        this.zeroDiscoverForm.value.Identified = 'Manual';
        this.isShowAutomateTool = false;
      }
    }

  }




  handleChangeSeverity(evt) {

    var target = evt.target;
    var Score = 0;

    switch (target.name) {
      case 'AV':
        {
          if (target.checked) {
            //this.severity.push(target.value);
            this.av = target.value;
            // Score = this.getScoreAV(target.value);

            // if (this.oldAV_isVisited) {
            //   this.totalScore = this.totalScore - this.oldAV;
            // }
            // else {
            //   this.oldAV = Score;
            //   this.oldAV_isVisited = true;
            // }


          }
        }
        break;
      case 'AC':
        {
          if (target.checked) {
            //this.severity.push(target.value);
            this.ac = target.value;
            // Score = this.getScoreAC(target.value);

            // if (this.oldac_isVisited) {
            //   this.totalScore = this.totalScore - this.oldac;
            // }
            // else {
            //   this.oldac = Score;
            //   this.oldac_isVisited = true;
            // }


          }
        }
        break;
      case 'PR':
        {
          if (target.checked) {
            // this.severity.push(target.value);
            this.pr = target.value;
            // Score = this.getScorePR(target.value);


            // if (this.oldpr_isVisited) {
            //   this.totalScore = this.totalScore - this.oldpr;
            // }
            // else {
            //   this.oldpr = Score;
            //   this.oldpr_isVisited = true;
            // }


          }
        }
        break;
      case 'UI':
        {
          if (target.checked) {
            // this.severity.push(target.value);
            this.ui = target.value;
            // Score = this.getScoreUI(target.value);

            // if (this.oldui_isVisited) {
            //   this.totalScore = this.totalScore - this.oldui;
            // }
            // else {
            //   this.oldui = Score;
            //   this.oldui_isVisited = true;
            // }


          }
        }
        break;
      case 'S':
        {
          if (target.checked) {
            // this.severity.push(target.value);
            this.s = target.value;
            // Score = this.getScoreCI(target.value);

            // if (this.olds_isVisited) {
            //   this.totalScore = this.totalScore - this.olds;
            // }
            // else {
            //   this.olds = Score;
            //   this.olds_isVisited = true;
            // }

          }
        }
        break;
      case 'C':
        {
          if (target.checked) {
            // this.severity.push(target.value);
            this.c = target.value;
            // Score = this.getScoreCI(target.value);

            // if (this.oldc_isVisited) {
            //   this.totalScore = this.totalScore - this.oldc;
            // }
            // else {
            //   this.oldc = Score;
            //   this.oldc_isVisited = true;
            // }

          }
        }
        break;
      case 'I':
        {
          if (target.checked) {
            // this.severity.push(target.value);
            this.i = target.value;
            // Score = this.getScoreII(target.value);

            // if (this.oldi_isVisited) {
            //   this.totalScore = this.totalScore - this.oldi;
            // }
            // else {
            //   this.oldi = Score;
            //   this.oldi_isVisited = true;
            // }

          }
        }
        break;
      case 'A':
        {
          if (target.checked) {
            // this.severity.push(target.value);
            this.a = target.value;
            // Score = this.getScoreAI(target.value);

            // if (this.olda_isVisited) {
            //   this.totalScore = this.totalScore - this.olda;
            // }
            // else {
            //   this.olda = Score;
            //   this.olda_isVisited = true;
            // }



          }
        }
        break;

    }

    // this.totalScore = Math.round(this.totalScore + Score);




    if (this.av && this.ac && this.pr && this.ui && this.s && this.c && this.i && this.a) {
      this.severity = "CVSS:3.0/AV:" + this.av + '/AC:' + this.ac + '/PR:' + this.pr + '/UI:' + this.ui + '/S:' + this.s + '/C:' + this.c + '/I:' + this.i + '/A:' + this.a;

      this.getScore(target.name, target.value);

    }


    //this.severity = this.remove_duplicates(this.severity);

    this.zeroDiscoverForm.value.severity = this.severity;

    // this.pushValuesForCVSS();

  }


  getScore(type: any, val: any) {
    // alert(this.severity);
    switch (this.severity) {

      case 'CVSS:3.0/AV:N/AC:H/PR:L/UI:N/S:U/C:H/I:H/A:H':
        {
          this.totalScore = 7.5;
        }
        break;

      case 'CVSS:3.0/AV:N/AC:H/PR:H/UI:N/S:U/C:H/I:H/A:H':
        {
          this.totalScore = 6.6;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:N':
        {
          this.totalScore = 0;
        }
        break;
      case 'CVSS:3.0/AV:A/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:N':
        {
          this.totalScore = 0;
        }
        break;
      case 'CVSS:3.0/AV:L/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:N':
        {
          this.totalScore = 0;
        }
        break;
      case 'CVSS:3.0/AV:P/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:N':
        {
          this.totalScore = 0;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:N':
        {
          this.totalScore = 0;
        }
        break;
      case 'CVSS:3.0/AV:A/AC:H/PR:L/UI:R/S:U/C:N/I:N/A:N':
        {
          this.totalScore = 0;
        }
        break;
      case 'CVSS:3.0/AV:A/AC:H/PR:L/UI:R/S:U/C:N/I:N/A:N':
        {
          this.totalScore = 0;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N':
        {
          this.totalScore = 5.3;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:C/C:L/I:N/A:N':
        {
          this.totalScore = 5.8;
        }
        break;
      case 'CVSS:3.0/AV:A/AC:H/PR:L/UI:R/S:U/C:L/I:L/A:H':
        {
          this.totalScore = 5.6;
        }
        break;
      case 'CVSS:3.0/AV:A/AC:H/PR:L/UI:R/S:U/C:H/I:L/A:H':
        {
          this.totalScore = 5.4;
        }
        break;
      case 'CVSS:3.0/AV:A/AC:H/PR:L/UI:R/S:C/C:H/I:L/A:H':
        {
          this.totalScore = 7.5;
        }
        break;
      case 'CVSS:3.0/AV:A/AC:H/PR:L/UI:R/S:C/C:H/I:H/A:H':
        {
          this.totalScore = 7.6;
        }
        break;

      case 'CVSS:3.0/AV:N/AC:H/PR:N/UI:N/S:C/C:L/I:N/A:N':
        {
          this.totalScore = 4.0;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:H/PR:L/UI:N/S:C/C:L/I:N/A:N':
        {
          this.totalScore = 3.5;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:H/PR:L/UI:R/S:C/C:L/I:N/A:N':
        {
          this.totalScore = 3.0;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:H/PR:H/UI:R/S:C/C:L/I:N/A:N':
        {
          this.totalScore = 2.6;
        }
        break;
      case 'CVSS:3.0/AV:A/AC:H/PR:H/UI:R/S:C/C:L/I:N/A:N':
        {
          this.totalScore = 2.4;
        }
        break;
      case 'CVSS:3.0/AV:L/AC:H/PR:H/UI:R/S:C/C:L/I:N/A:N':
        {
          this.totalScore = 2.3;
        }
        break;

      case 'CVSS:3.0/AV:P/AC:H/PR:L/UI:N/S:C/C:L/I:N/A:N':
        {
          this.totalScore = 2.1;
        }
        break;
      case 'CVSS:3.0/AV:P/AC:H/PR:H/UI:N/S:C/C:L/I:N/A:N':
        {
          this.totalScore = 1.9;
        }
        break;
      case 'CVSS:3.0/AV:P/AC:H/PR:L/UI:R/S:C/C:L/I:N/A:N':
        {
          this.totalScore = 1.9;
        }
        break;
      case 'CVSS:3.0/AV:P/AC:H/PR:L/UI:R/S:U/C:L/I:N/A:N':
        {
          this.totalScore = 1.7;
        }
        break;
      case 'CVSS:3.0/AV:P/AC:H/PR:L/UI:R/S:C/C:H/I:N/A:N':
        {
          this.totalScore = 4.7;
        }
        break;

      case 'CVSS:3.0/AV:P/AC:H/PR:L/UI:R/S:C/C:H/I:L/A:N':
        {
          this.totalScore = 5.5;
        }
        break;
      case 'CVSS:3.0/AV:P/AC:H/PR:L/UI:R/S:C/C:H/I:H/A:N':
        {
          this.totalScore = 6.6;
        }
        break;
      case 'CVSS:3.0/AV:P/AC:H/PR:L/UI:R/S:C/C:H/I:H/A:L':
        {
          this.totalScore = 6.8;
        }
        break;
      case 'CVSS:3.0/AV:P/AC:H/PR:L/UI:R/S:C/C:H/I:H/A:H':
        {
          this.totalScore = 6.9;
        }
        break;
      case 'CVSS:3.0/AV:P/AC:H/PR:H/UI:R/S:C/C:H/I:H/A:H':
        {
          this.totalScore = 6.8;
        }
        break;

      case 'CVSS:3.0/AV:P/AC:H/PR:N/UI:R/S:C/C:H/I:H/A:H':
        {
          this.totalScore = 7.0;
        }
        break;

      case 'CVSS:3.0/AV:P/AC:L/PR:N/UI:R/S:C/C:H/I:H/A:H':
        {
          this.totalScore = 7.3;
        }
        break;

      case 'CVSS:3.0/AV:N/AC:L/PR:N/UI:R/S:C/C:H/I:H/A:H':
        {
          this.totalScore = 9.6;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H':
        {
          this.totalScore = 10;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:L/PR:H/UI:N/S:C/C:H/I:H/A:H':
        {
          this.totalScore = 9.1;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:L/PR:H/UI:N/S:C/C:H/I:L/A:H':
        {
          this.totalScore = 9.0;
        }
        break;

      case 'CVSS:3.0/AV:N/AC:L/PR:H/UI:N/S:C/C:N/I:L/A:H':
        {
          this.totalScore = 7.6;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:L/PR:H/UI:N/S:C/C:N/I:H/A:H':
        {
          this.totalScore = 7.6;
        }
        break;
      case 'CVSS:3.0/AV:A/AC:H/PR:L/UI:R/S:U/C:H/I:H/A:L':
        {
          this.totalScore = 6.4;
        }
        break;

      case 'CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:N':
        {
          this.totalScore = 10;
        }
        break;
      case 'CVSS:3.0/AV:L/AC:H/PR:H/UI:R/S:C/C:N/I:L/A:L  ':
        {
          this.totalScore = 3.7;
        }
        break;
      case 'CVSS:3.0/AV:A/AC:L/PR:L/UI:R/S:U/C:L/I:L/A:L':
        {
          this.totalScore = 4.9;
        }
        break;
      case 'CVSS:3.0/AV:L/AC:H/PR:H/UI:R/S:C/C:H/I:L/A:H':
        {
          this.totalScore = 7.2;
        }
        break;
      case 'CVSS:3.0/AV:L/AC:H/PR:H/UI:R/S:C/C:N/I:L/A:H':
        {
          this.totalScore = 5.8;
        }
        break;
      case 'CVSS:3.0/AV:L/AC:H/PR:H/UI:R/S:C/C:N/I:H/A:L':
        {
          this.totalScore = 5.8;
        }
        break;
      case 'CVSS:3.0/AV:L/AC:H/PR:H/UI:R/S:C/C:H/I:H/A:L':
        {
          this.totalScore = 7.2;
        }
        break;
      case 'CVSS:3.0/AV:L/AC:H/PR:H/UI:R/S:C/C:H/I:H/A:H':
        {
          this.totalScore = 7.2;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:H/PR:H/UI:R/S:C/C:H/I:H/A:H':
        {
          this.totalScore = 7.6;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:L/PR:H/UI:R/S:C/C:H/I:H/A:H':
        {
          this.totalScore = 8.4;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:L/PR:N/UI:R/S:U/C:L/I:L/A:N':
        {
          this.totalScore = 5.4;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:N':
        {
          this.totalScore = 8.1;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:L/A:N':
        {
          this.totalScore = 7.1;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:N/A:N':
        {
          this.totalScore = 6.5;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:L/PR:H/UI:R/S:U/C:H/I:N/A:N':
        {
          this.totalScore = 4.5;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:H/PR:H/UI:R/S:U/C:H/I:N/A:N':
        {
          this.totalScore = 4.2;
        }
        break;
      case 'CVSS:3.0/AV:A/AC:H/PR:L/UI:R/S:C/C:N/I:N/A:L':
        {
          this.totalScore = 2.6;
        }
        break;
      case 'CVSS:3.0/AV:A/AC:H/PR:L/UI:R/S:C/C:H/I:N/A:L':
        {
          this.totalScore = 6.2;
        }
        break;

      case 'CVSS:3.0/AV:N/AC:H/PR:H/UI:R/S:U/C:H/I:N/A:H':
        {
          this.totalScore = 5.7;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:H/PR:H/UI:R/S:C/C:H/I:N/A:H':
        {
          this.totalScore = 5.7;
        }
        break;
      case 'CVSS:3.0/AV:P/AC:H/PR:H/UI:R/S:C/C:H/I:N/A:H':
        {
          this.totalScore = 6.5;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:H/PR:L/UI:R/S:C/C:L/I:L/A:H':
        {
          this.totalScore = 7.1;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:H/PR:H/UI:R/S:C/C:L/I:L/A:H':
        {
          this.totalScore = 6.8;
        }
        break;
      case 'CVSS:3.0/AV:P/AC:H/PR:H/UI:R/S:C/C:L/I:L/A:H':
        {
          this.totalScore = 6.0;
        }
        break;
      case 'CVSS:3.0/AV:P/AC:H/PR:H/UI:R/S:C/C:L/I:H/A:H':
        {
          this.totalScore = 6.7;
        }
        break;
      case 'CVSS:3.0/AV:P/AC:H/PR:H/UI:R/S:C/C:L/I:H/A:N':
        {
          this.totalScore = 5.4;
        }
        break;
      case 'CVSS:3.0/AV:P/AC:H/PR:H/UI:R/S:C/C:L/I:N/A:N':
        {
          this.totalScore = 1.8;
        }
        break;
      case 'CVSS:3.0/AV:P/AC:H/PR:H/UI:R/S:C/C:L/I:N/A:H':
        {
          this.totalScore = 5.4;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:H/PR:H/UI:R/S:C/C:H/I:N/A:L':
        {
          this.totalScore = 6.2;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:H/PR:H/UI:R/S:C/C:H/I:L/A:L':
        {
          this.totalScore = 6.8;
        }
        break;
      case 'CVSS:3.0/AV:N/AC:H/PR:H/UI:R/S:C/C:H/I:H/A:L':
        {
          this.totalScore = 7.5;
        }
        break;
      case 'CVSS:3.0/AV:A/AC:H/PR:L/UI:N/S:C/C:N/I:N/A:L':
        {
          this.totalScore = 3.0;
        }
        break;
      case 'CVSS:3.0/AV:A/AC:H/PR:L/UI:R/S:C/C:N/I:N/A:L':
        {
          this.totalScore = 2.6;
        }
        break;
      case 'CVSS:3.0/AV:A/AC:H/PR:L/UI:R/S:C/C:N/I:H/A:L':
        {
          this.totalScore = 6.2;
        }
        break;
      case 'CVSS:3.0/AV:A/AC:H/PR:L/UI:R/S:C/C:H/I:H/A:L':
        {
          this.totalScore = 7.5;
        }
        break;
      case 'CVSS:3.0/AV:L/AC:H/PR:L/UI:R/S:C/C:N/I:H/A:L':
        {
          this.totalScore = 6.1;
        }
        break;
      case 'CVSS:3.0/AV:P/AC:H/PR:L/UI:R/S:C/C:N/I:H/A:H':
        {
          this.totalScore = 6.6;
        }
        break;
      case 'CVSS:3.0/AV:P/AC:H/PR:L/UI:R/S:C/C:H/I:H/A:H':
        {
          this.totalScore = 6.9;
        }
        break;
      case 'CVSS:3.0/AV:A/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:N':
        {
          this.totalScore = 0;
        }
        break;

      default:
        {


          switch (type) {
            case 'AV':
              {
                if (val == 'N') { //Network
                  this.totalScore = 2.3;
                } else if (val == 'A') { //Adjacent Network
                  this.totalScore = 2.2;
                } else if (val == 'L') { //Local
                  this.totalScore = 0;
                } else { //Physical
                  this.totalScore = 0;
                }
              }
              break
            case 'AC':
              {
                if (val == 'L') { //Local
                  this.totalScore = 2.7;
                } else { //Physical
                  this.totalScore = 6.2;
                }
              }
              break;
            case 'PR':
              {
                if (val == 'L') { //Local
                  this.totalScore = 0;
                } else { //Physical
                  this.totalScore = 2.1;
                }
              }
              break;
            case 'C':
              {
                if (val == 'H') { //Local
                  this.totalScore = 3.8;
                }
                else if (val == 'L') { //Local
                  this.totalScore = 4.7;
                } else { //Physical
                  this.totalScore = 2.4;
                }
              }
              break;
            case 'A':
              {
                if (val == 'H') { //Local
                  this.totalScore = 8.7;
                } else { //Physical
                  this.totalScore = 3.1;
                }
              }
              break;

          }
        }
        break;



    }
  }


  // pushValuesForCVSS = function () {

  //  
  //   this.zeroDiscoverForm.value.severity;



  //   var cvssCalc = CVSS.calculateCVSSFromMetrics('N', 'L', 'L', 'N', 'U', 'N', 'L', 'L');
  //   if (cvssCalc.success === true) {
  //     // update in report object 
  //     this.report.severity = cvssCalc.vectorString;

  //     this.baseMetricScore = cvssCalc.baseMetricScore;
  //     this.baseSeverity = cvssCalc.baseSeverity;
  //     this.vectorString = cvssCalc.vectorString;
  //   } else {
  //     this.baseMetricScore = 0;
  //     this.baseSeverity = '';
  //     this.vectorString = '';
  //   }
  // };



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







  // /attack vector
  getScoreAV(val) {
    if (val == 'N') { //Network
      return 0.85;
    } else if (val == 'A') { //Adjacent Network
      return 0.62;
    } else if (val == 'L') { //Local
      return 0.55;
    } else { //Physical
      return 0.20;
    }
  }

  //Attack Complexity

  getScoreAC(val) {
    if (val == 'L') { //Low
      return 0.77;
    } else { //High
      return 0.44;
    }
  }

  //Privileges Required
  getScorePR(val) {
    if (val == 'N') { //None
      return 0.85;
    } else if (val == 'L') { //Low
      return 0.62;
    } else { //High
      return 0.27;
    }
  }



  //User Interaction
  getScoreUI(val) {
    if (val == 'N') { //None
      return 0.85;
    } else { //Required
      return 0.62;
    }
  }


  //Confidentiality Impact
  getScoreCI(val) {
    if (val == 'H') { //High
      return 0.56;
    } else if (val == 'L') { //Low
      return 0.22;
    } else { //None
      return 0.0
    }
  }

  //Integrity Impact
  getScoreII(val) {
    if (val == 'H') { //High
      return 0.56;
    } else if (val == 'L') { //Low
      return 0.22;
    } else { //None
      return 0.0
    }
  }

  //Availability Impact
  getScoreAI(val) {
    if (val == 'H') { //High
      return 0.56;
    } else if (val == 'L') { //Low
      return 0.22;
    } else { //None
      return 0.0
    }
  }
}
