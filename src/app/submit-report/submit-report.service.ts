import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../core/http/http.service';

@Injectable() 

export class SubmitReportService {
    constructor(private http: HttpService) {}

    submitReport(data: any): Observable<any>{
        return this.http.post('bug', data);
    }
}
