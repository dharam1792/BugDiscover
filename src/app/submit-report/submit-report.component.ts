import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
// import { BaseService } from '../base-service.service';
import { ActivatedRoute } from '@angular/router';
import { SubmitReportService } from './submit-report.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModalComponent } from '../shared/common-modal/common-modal.component';

@Component({
  selector: 'app-submit-report',
  templateUrl: './submit-report.component.html',
  styleUrls: ['./submit-report.component.scss']
})
export class SubmitReportComponent implements OnInit {

  submitReportForm: FormGroup;
  activeTab: string;
  prgId: number;
  prgName: string;
  responseMsg;

  public programID: AbstractControl;
  public scope: AbstractControl;
  public title: AbstractControl;
  public vulnerablity_type: AbstractControl;
  public severity: AbstractControl;
  public description: AbstractControl;
  public identifiedBy: AbstractControl;
  public answer: AbstractControl;
  public ifYes: AbstractControl;
  public notes: AbstractControl;
  public score: AbstractControl;
  public images: AbstractControl;
  public terms: AbstractControl;
  active: any = 'mui--is-active';
  active2: any = '';
  active3: any = '';
  error: any;

  constructor(
    private fb: FormBuilder, 
    public service: SubmitReportService, 
    private modalService: NgbModal,
    private route: ActivatedRoute) {
    this.prgId = this.route.snapshot.params.prgId;
    this.prgName = this.route.snapshot.params.PrgName;
  }

  ngOnInit() {
    this.changeTab('1');
    this.createForm();
    this.answer.setValue(1);
  }

  changeTab(tabNo) {
    if(tabNo != '1'){
      if(this.submitReportForm.valid){
        this.activeTab = tabNo;
      } else {
        this.error = 'Please accept terms and condition and then procced.';
        for (let i in this.submitReportForm.controls) {
          if (this.submitReportForm.controls[i]) {
            this.submitReportForm.controls[i].markAsTouched();
          }
        }
      }
    } else {
      this.activeTab = tabNo;
    }
    if(tabNo == '1'){
      this.active = 'mui--is-active';
      this.active2 = '';
      this.active3 = '';
    } else if(tabNo == '2'){
      this.active = '';
      this.active2 = 'mui--is-active';
      this.active3 = '';
    } else {
      this.active3 = 'mui--is-active';
      this.active = '';
      this.active2 = '';
    }
  }
  createForm() {

    this.submitReportForm = this.fb.group({
      'programID': [this.prgId],
      'scope': ['', Validators.compose([Validators.required])],
      'title': ['', Validators.compose([Validators.required])],
      'vulnerablity_type': ['', Validators.compose([Validators.required])],
      'severity': ['', Validators.compose([Validators.required])],
      'description': ['', Validators.compose([Validators.required])],
      'identifiedBy': ['', Validators.compose([Validators.required])],
      'answer': ['', Validators.compose([Validators.required])],
      'ifYes': [''],
      'notes': ['', Validators.compose([Validators.required])],
      'score':[''],
      'images': [], // files
      'terms': ['']

    });
    this.programID = this.submitReportForm.controls['programID'];
    this.scope = this.submitReportForm.controls['scope'];
    this.title = this.submitReportForm.controls['title'];
    this.vulnerablity_type = this.submitReportForm.controls['vulnerablity_type'];
    this.severity = this.submitReportForm.controls['severity'];
    this.description = this.submitReportForm.controls['description'];
    this.identifiedBy = this.submitReportForm.controls['identifiedBy'];
    this.answer = this.submitReportForm.controls['answer'];
    this.ifYes = this.submitReportForm.controls['ifYes'];
    this.notes = this.submitReportForm.controls['notes'];
    this.score = this.submitReportForm.controls['score'];
    this.images = this.submitReportForm.controls['images'];
    this.terms = this.submitReportForm.controls['terms'];


  }


  urls = new Array<string>();
  detectFiles(event) {
    this.urls = [];
    let files = event.target.files;
    if (files) {
      debugger;
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
      console.log(this.urls);
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
    this.service.submitReport(this.submitReportForm.value).subscribe(
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

        }
      }
    );

  }


}
