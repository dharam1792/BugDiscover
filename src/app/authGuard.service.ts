import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
isLogedin:boolean;
    constructor(private router: Router ) {
    

  }
  canActivate() {
    // console.log(localStorage.getItem('token'))
      if (localStorage.getItem("token")) {
      return true;
    }
      else{
          this.router.navigate(['']);
      }
    
  }

  canActivateChild() {
    console.log('checking child route access');
    return false;
  }

}