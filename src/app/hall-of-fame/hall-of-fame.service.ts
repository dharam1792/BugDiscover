import { Injectable } from '@angular/core';
import { HttpService } from '../core/http/http.service';
import { Observable } from '../../../node_modules/rxjs';

@Injectable()

export class HallOfFameService {
    constructor(private http: HttpService){}

    getHallOfFame(): Observable<any> {
        return this.http.get('halloffame').map(req => req.json());
    }

    getUserById(id: any): Observable<any> {
        return this.http.get('user/profile/'+id).map(req => req.json());
    }

    getCompanyById(id: any): Observable<any> {
        return this.http.get('program/'+id).map(req =>req.json());
    }

}
