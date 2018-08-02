import { Component, OnInit } from '@angular/core';
import { BaseService } from '../base-service.service';
import { ConfigService } from '../config';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-program-details-research',
  templateUrl: './program-details-research.component.html',
  styleUrls: ['./program-details-research.component.css']
})
export class ProgramDetailsResearchComponent implements OnInit {

  isLoader: boolean = true;
  pid: any;
  response: any={};
  userType: string = localStorage.getItem('userType');
  submitbutton = false;
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
// this.submitbutton = true;
    
  }




  async getPrograms() {

    this.isLoader = true;

    this._baseService.getProgramDetails(this.pid).subscribe(
      (result: any) => {
        this.isLoader = false;
        console.log(JSON.stringify(result));
        if (result) {
          this.response = result;
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
