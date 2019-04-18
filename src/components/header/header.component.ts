import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../../services/session.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    loginSubscription : any;
    logoutSubscription : any;

    profileButtonVisible : boolean;



    constructor(private router : Router, private sessionService : SessionService) { }



    ngOnInit() {
        this.profileButtonVisible = this.sessionService.isLoggedIn();

        this.loginSubscription = this.sessionService.loginEvent.subscribe((credentials) => {
            this.profileButtonVisible = true;
        });

        this.logoutSubscription = this.sessionService.logoutEvent.subscribe((credentials) => {
            this.profileButtonVisible = false;
        });
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
        this.logoutSubscription.unsubscribe();
    }

    helpClick() {
        this.router.navigate(["/help"]);
    }

}
