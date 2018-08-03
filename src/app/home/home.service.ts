import { Injectable } from '@angular/core';
import { HttpService } from '../core/http/http.service';
import { Observable } from '../../../node_modules/rxjs';

@Injectable()

export class HomeService {
    constructor(private http: HttpService){}

    getProfile(): Observable<any> {
        return this.http.get('user/profile/').map(req => req.json());
    }

    getResearcher(): Observable<any> {
        return this.http.get('program/researcher').map(req => req.json());
    }
}