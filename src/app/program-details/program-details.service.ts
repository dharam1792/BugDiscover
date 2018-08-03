import { Injectable } from '@angular/core';
import { HttpService } from '../core/http/http.service';
import { Observable } from '../../../node_modules/rxjs';

@Injectable()

export class ProgramDetailsService {
    constructor(private http: HttpService){}

    getProgramById(id: any): Observable<any> {
        return this.http.get('program/'+id).map(req =>req.json());
    }

    getHallOfFame(id: any): Observable<any> {
        return this.http.get('halloffame/program/'+id).map(req => req.json());
    }
}