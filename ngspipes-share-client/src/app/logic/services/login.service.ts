import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Headers, Http } from '@angular/http';

import { Server } from './server';



@Injectable()
export class LoginService {

    loginEvent = new Subject<[string, string]>();
    logoutEvent = new Subject<[string, string]>();



    constructor(private http: Http) { }



    login(userName: string, password: string) : Promise<boolean> {
        let headers = new Headers();
        headers.append("Authorization", "Basic " + btoa(userName+":"+password));

        return this.http.post(Server.AUTHENTICATION_URI, null, {headers: headers})
            .toPromise()
            .then(response => {
                if(response.status == 200) {
                    this.loginEvent.next([userName, password]);
                    return true;
                }

                return false;
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
        this.logoutEvent.next([userName, password]);
        return Promise.resolve(true);
    }

}
