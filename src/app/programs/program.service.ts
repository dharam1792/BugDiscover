import { Injectable } from '@angular/core';
import { HttpService } from '../core/http/http.service';
import { Observable } from '../../../node_modules/rxjs';

@Injectable()

export class ProgramService {
    constructor(private http: HttpService){}

    
    getPrograms(): Observable<any> {
        return this.http.get('program/all').map(req => req.json());
    }
}