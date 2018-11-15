import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService } from '../../../services/session.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

    loginSubscription : any;
    logoutSubscription : any;
    paramsSubscription : any;

    userName : string;
    editable : boolean;



    constructor(private sessionService : SessionService,
                private activatedRoute : ActivatedRoute,
                private router : Router) { }



    ngOnInit() {
        this.loginSubscription = this.sessionService.loginEvent.subscribe(() => {
                this.checkEditable();
        });

        this.logoutSubscription = this.sessionService.logoutEvent.subscribe(() => {
                this.checkEditable();
        });

        this.paramsSubscription = this.activatedRoute.params.subscribe(() => {
            this.userName = this.activatedRoute.snapshot.params.userName;
            this.checkEditable();
        });

        this.checkEditable();
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
        this.logoutSubscription.unsubscribe();
        this.paramsSubscription.unsubscribe();
    }

    checkEditable() {
        let currentUserName = this.sessionService.getCurrentCredentials()[0];
        this.editable = this.userName === currentUserName;
    }

}
