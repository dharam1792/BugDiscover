import { Injectable } from '@angular/core';
import { HttpService } from '../core/http/http.service';
import { Observable } from '../../../node_modules/rxjs';

@Injectable()

export class SubmissionsService {
    constructor(private http: HttpService){}

    
    getSubmissions(): Observable<any> {
        return this.http.get('bug/submissionReport').map(req => req.json());
    }
    
    getCompanySubmissions(): Observable<any> {
        return this.http.get('program/company/submissions').map(req => req.json());
    }
}