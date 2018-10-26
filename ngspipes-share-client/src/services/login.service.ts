import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Headers, Http } from '@angular/http';

import { ServersRoutes } from './servers-routes';



@Injectable()
export class LoginService {

    constructor(private http: Http) { }



    login(userName: string, password: string) : Promise<boolean> {
        let headers = new Headers();
        headers.append("Authorization", "Basic " + btoa(userName+":"+password));
        
        return this.http.post(ServersRoutes.LOGIN_ROUTE, null, {headers: headers})
            .toPromise()
            .then(response => {
                return response.status == 200;
            })
            .catch(error => {
                if(error.status === 401) {
                    return false;
                } else {
                    console.error(error);
                    throw "Error contacting Server!";
                }
            });
    }

    logout(userName : string, password : string) : Promise<boolean> {
        return Promise.resolve(true);
    }

}
