import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfigService } from '../../config';
import { BaseService } from '../../base-service.service';

@Component({
  selector: 'app-reward-receiptr',
  templateUrl: './receipt_r.component.html',
  styleUrls: ['./receipt_r.component.css']
})


export class RewardsReceiptRComponent implements OnInit {
  userType: string = localStorage.getItem('userType');
  userProfile: any = localStorage.getItem('userProfile');
  
  latestRewards:any={};
  isLoader:boolean=true;
  
  
  constructor(public http: Http, public _config: ConfigService, public _baseService: BaseService, private fb: FormBuilder,
    private router: Router) {

    if (localStorage.getItem("token")) {
      this.getRewards();
    }
    else {
      this.router.navigate(['dashboard']);
    }

  }

  
  ngOnInit() {
  //  this.latestRewards = this._config.dummyData.Rewards_R;
  }

  async getRewards() {

    this.isLoader = true;

    this._baseService.getRewards().subscribe(
      (result: any) => {

        debugger;

        if (result) {

          if (this._config.isDummyData) {
            this.latestRewards = this._config.dummyData.Rewards_R;
          }
          else {
            this.latestRewards = result;
          }

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

}
