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


@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {


  userType: string = localStorage.getItem('userType');
  userProfile: any = localStorage.getItem('userProfile');
  p: number = 1;
  rewardType:string = '';
  programType:string = '';
  latestPrograms: any = [];
  isLoader: boolean = true;

  constructor(public http: Http, public _config: ConfigService, public _baseService: BaseService, private fb: FormBuilder,
    private router: Router) {

      if (localStorage.getItem("token")) {
        this.getPrograms();
           }
      else {
        this.router.navigate(['dashboard']);
      }
  

  }

  ngOnInit() {
  }



  async getPrograms() {

    this.isLoader=true;

    this._baseService.getPrograms().subscribe(
      (result: any) => {
        
        if (result) {
        // console.log(JSON.stringify(result))

        this.isLoader=false;
        // alert(this.isLoader);
          if (this._config.isDummyData) {
            this.latestPrograms = this._config.dummyData.ProgramsData;
          }
          else {
            this.latestPrograms = result;
          }

        // this.isLoader=false;

        }

      }, (error) => {
        this.isLoader=false;
        
      }
    );

  }
 
  reset(){
    this.rewardType= '';
    this.programType= '';
  }

}
