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


export const halloffame = {  
    "halloffame":[  
       {  
          "researcher_id":4,
          "researcher_name":"munish",
          "image":"http://18.219.207.120//uploads/users/7b7697b221131ed434dcb3e04c0e621b.png",
          "score":0,
          "rank":0
       },
       {  
          "researcher_id":5,
          "researcher_name":"arun",
          "image":"http://18.219.207.120//uploads/users/7b7697b221131ed434dcb3e04c0e621b.png",
          "score":1,
          "rank":1
       },
       {  
          "researcher_id":6,
          "researcher_name":"barun",
          "image":"http://18.219.207.120//uploads/users/7b7697b221131ed434dcb3e04c0e621b.png",
          "score":3,
          "rank":3
       }
    ],
    "myhalloffame":[  
 
    ]
 }