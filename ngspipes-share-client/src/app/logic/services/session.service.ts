import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { LoginService } from './login.service';



@Injectable()
export class SessionService {

    private static readonly USER_NAME_KEY = "userName";
    private static readonly PASSWORD_KEY = "password";



    redirectUrl : string;
    loginEvent : Subject<[string, string]>;
    logoutEvent : Subject<[string, string]>;
    loggedIn : boolean;
    currentCredentials : [string, string];



    constructor(private loginService : LoginService) {
        this.loginEvent = loginService.loginEvent;
        this.logoutEvent = loginService.logoutEvent;
    }



    login(userName: string, password: string) : Promise<boolean> {
        return this.loginService.login(userName, password)
            .then((response) => {
                if(response) {
                    this.loggedIn = true;
                    this.currentCredentials = [userName, password];

                    window.localStorage.setItem(SessionService.USER_NAME_KEY, userName);
                    window.localStorage.setItem(SessionService.PASSWORD_KEY, password);
                }

                return response;
            });
    }

    logout() : Promise<boolean> {
        return this.loginService.logout(this.currentCredentials[0], this.currentCredentials[1])
            .then((response) => {
                if(response) {
                    let credentials = this.currentCredentials;

                    this.loggedIn = false;
                    this.currentCredentials = undefined;

                    window.localStorage.removeItem(SessionService.USER_NAME_KEY);
                    window.localStorage.removeItem(SessionService.PASSWORD_KEY);
                }

                return response;
            });
    }

    getCurrentCredentials() : [string, string] {
        if(!this.currentCredentials) {
            if(window.localStorage.getItem(SessionService.USER_NAME_KEY)) {
                  let userName = window.localStorage.getItem(SessionService.USER_NAME_KEY);
                  let password = window.localStorage.getItem(SessionService.PASSWORD_KEY);

                  this.currentCredentials = [userName, password];
            }
        }

        return this.currentCredentials;
    }

    isLoggedIn() : boolean {
        return this.loggedIn;
    }

}
