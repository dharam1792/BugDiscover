import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService } from '../base-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-submit-report',
  templateUrl: './submit-report.component.html',
  styleUrls: ['./submit-report.component.css']
})
export class SubmitReportComponent implements OnInit {

  userType: string = localStorage.getItem('userType');
  userProfile: any = localStorage.getItem('userProfile');
  submitReportForm: FormGroup;
  activeTab: string;
  prgId: number;
  prgName: string;
  responseMsg;




  constructor(private fb: FormBuilder, public _baseService: BaseService, private route: ActivatedRoute) {
    this.prgId = this.route.snapshot.params.prgId;
    this.prgName = this.route.snapshot.params.PrgName;
  }

  ngOnInit() {
    this.changeTab('1');
    this.createForm();
  }

  changeTab(tabNo) {
    this.activeTab = tabNo;
  }
  createForm() {

    this.submitReportForm = this.fb.group({
      programID: [this.prgId],
      scope: ['', Validators.required],
      title: ['', Validators.required],
      vulnerablity_type: ['', Validators.required],
      severity: ['', Validators.required],
      description: ['', Validators.required],
      identifiedBy: ['', Validators.required],
      answer: ['', Validators.required],
      ifYes: [''],
      notes: ['', Validators.required],
      score:[''],
      // severity: ['',Validators.required],
      // answer: ['', Validators.required],
      images: [] // files

    });


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


  // url: string;
  // onSelectFile(event) { // called each time file input changes
  //     if (event.target.files && event.target.files[0]) {
  //       var reader = new FileReader();
  
  //       reader.readAsDataURL(event.target.files[0]); // read file as data url
  
  //       reader.onload = (event) => { // called once readAsDataURL is completed
  //         console.log(event);
  //         this.url = event.target.result;
  //       }
  //     }
  // }


  formSubmit() {
    let data = new FormData();
    console.log(Object.keys(this.submitReportForm.value));
    for (let value of Object.keys(this.submitReportForm.value)) {
      data.append(value, this.submitReportForm.value[value]);
    }
    // for (let value of Object.keys(this.submitReportForm.value)) {
    //   console.log(data.get(value))
    // }

    // let postData = this.submitReportForm.value;
    this._baseService.submitReport(data).subscribe(
      (result: any) => {

        if (result) {

          console.log(JSON.stringify(result));
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


}
