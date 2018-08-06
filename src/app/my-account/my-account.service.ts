import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../core/http/http.service';
import { AuthenticationService } from '../core/auth/auth.service';

@Injectable()

export class MyAccountService {

    userType: any;

    constructor(private http: HttpService, private authService:AuthenticationService) { 
        this.userType = this.authService.credentials.userType;
    }

    changePassowrd(data: any): Observable<any> {
        return this.http.put('user/profile/ChangePassword', data);
    }

    ChangeProfilePicture(data: any): Observable<any> {
        return this.http.put('user/changeprofilepicture/', data);
    }

    getProfile(): Observable<any> {
        return this.http.get('user/profile/').map(req => req.json());
    }

    getPrivacy(): Observable<any> {
        return this.http.get('user/profile/privacy/').map(req => req.json());
    }

    updateProfile(data: any): Observable<any> {
        let requestURL
        if (this.userType == 'R') {
            requestURL = 'user/researcher/profile/';
        }
        else if (this.userType == 'C') {

            requestURL = 'user/company/profile/';
        }
        return this.http.put(requestURL, data);
    }

    updatePrivacy(data: any): Observable<any> {
        return this.http.put('user/profile/privacy/', data);
    }
}