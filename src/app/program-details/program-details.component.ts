import { Component, OnInit } from '@angular/core';

import { Http } from "@angular/http";
import "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseService } from '../base-service.service';
import { ConfigService } from '../config';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.css']
})
export class ProgramDetailsComponent implements OnInit {
  isLoader: boolean = true;
  pid: any;
  response: any = {};
  userType: string = localStorage.getItem('userType');
  submitbutton = false;
  totalBugs;
  p: number = 1;

  constructor(public _baseService: BaseService, public _config: ConfigService, private router: Router,
    private route: ActivatedRoute) {

    this.userType = localStorage.getItem('userType');

    this.pid = this.route.snapshot.params.pid;
    if (localStorage.getItem("token")) {
      this.getPrograms();
    }
    else {
      this.router.navigate(['dashboard']);
    }

  }

  ngOnInit() {
    this.getHallofFame()
  }

  listofHallOfFame;
  getHallofFame() {

    this.isLoader = true;

    this._baseService.getHallOfFame(this.pid).subscribe(
      (result: any) => {
        this.isLoader = false;
        console.log(JSON.stringify(result));
        if (result) {
          this.listofHallOfFame = result;
        }

      }, (error) => {
        this.isLoader = false;

      }
    );

  }

  async getPrograms() {

    this.isLoader = true;

    this._baseService.getProgramDetails(this.pid).subscribe(
      (result: any) => {
        this.isLoader = false;
        console.log(JSON.stringify(result));
        if (result) {
          this.response = result;
          // console.log("@@"+JSON.stringify(this.response.bugs));
          this.totalBugs = this.response.bugs.length
          this.submitbutton = this.response.isParticipated;
        }

      }, (error) => {
        this.isLoader = false;

      }
    );

  }
  cancelPrograms() {

    this.isLoader = true;

    this._baseService.cancelProgram(this.pid).subscribe(
      (result: any) => {
        this.isLoader = false;
        // console.log(JSON.stringify(result));
        if (result) {

          this.router.navigate(['programs']);
          // this.response = result;
          // alert("@@"+JSON.stringify(result));
          // this.submitbutton = this.response.isParticipated;

        }

      }, (error) => {
        this.isLoader = false;

      }
    );

  }

  participateOrJoinPrograms() {

    this.isLoader = true;

    this._baseService.getParticipateOrJoinPrograms(this.pid).subscribe(
      (result: any) => {
        this.isLoader = false;
        console.log(JSON.stringify(result));
        if (result) {
          this.submitbutton = true;
          // this.response = result;
        }

      }, (error) => {
        this.isLoader = false;

      }
    );

  }



}
