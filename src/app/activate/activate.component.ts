import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

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
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {
public activationStatus:any={};

  constructor(private route: ActivatedRoute,public http: Http, public _config: ConfigService, public _baseService: BaseService, private fb: FormBuilder,
    private router: Router) {
    
    this.route.params.subscribe( (params:any) => {
      // console.log(params);
      // console.log(this.router.url); //  /routename
      if(params.token)
      {
        this._baseService.activateProfile(params.token).subscribe(
          (result: any) => {
            if (result) {
             
             this.activationStatus = result;
            }
    
          }, (error) => {
            
          }
        );
      }
  

      
      
    } );
}
  ngOnInit() {
  }

}
