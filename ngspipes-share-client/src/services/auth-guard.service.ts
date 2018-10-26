import { Injectable }       from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { SessionService } from './session.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private sessionService : SessionService, private router: Router) {}



    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<boolean> {
        if(this.sessionService.isLoggedIn()) {
            return Promise.resolve(true);
        } else {
            let storedCredentials = this.sessionService.getCurrentCredentials();
            if(storedCredentials) {
                return this.checkIfStoredCredentialsAreValid(storedCredentials[0], storedCredentials[1], state.url);
            } else {
                this.sessionService.redirectUrl = state.url;

                this.router.navigate(['/login']);

                return Promise.resolve(false);
            }
        }
    }

    checkIfStoredCredentialsAreValid(name : string, password : string, redirectUrl : string) : Promise<boolean> {
        return this.sessionService.login(name, password)
            .then((res) => {
                if(!res) {
                    this.sessionService.redirectUrl = redirectUrl;
                    this.router.navigate(['/login']);
                }

                return res;
            })
            .catch(() => {
                this.sessionService.redirectUrl = redirectUrl;
                this.router.navigate(['/login']);
                return false;
            });
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.canActivate(route, state);
    }

}
