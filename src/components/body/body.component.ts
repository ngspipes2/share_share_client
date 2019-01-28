import { Component, OnInit, OnDestroy } from '@angular/core';

import { SessionService } from '../../services/session.service';

@Component({
    selector: 'app-body',
    templateUrl: './body.component.html',
    styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit, OnDestroy {

    loginSubscription: any;
    logoutSubscription: any;
    loggedIn : boolean;



    constructor(private sessionService : SessionService) { }



    ngOnInit() {
        this.loginSubscription = this.sessionService.loginEvent.subscribe( () => {
            this.loggedIn = true;
        });

        this.logoutSubscription = this.sessionService.logoutEvent.subscribe(() => {
            this.loggedIn = false;
        });

        this.loggedIn = this.sessionService.isLoggedIn();
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
        this.logoutSubscription.unsubscribe();
    }

}
