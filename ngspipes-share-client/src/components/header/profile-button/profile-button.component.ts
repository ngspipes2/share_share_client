import { Component, OnInit, OnDestroy } from '@angular/core';

import { User } from '../../../entities/user';
import { UserService } from '../../../services/user.service';
import { SessionService } from '../../../services/session.service';

import { OperationsManager } from '../../operations.manager';

@Component({
    selector: 'app-profile-button',
    templateUrl: './profile-button.component.html',
    styleUrls: ['./profile-button.component.scss']
})
export class ProfileButtonComponent implements OnInit, OnDestroy {

    loading : boolean;

    userUpdateSubscription : any;

    currentTheme : string;
    user : User;



    constructor(private sessionService : SessionService,
                private userService : UserService,
                private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.userUpdateSubscription = this.userService.userUpdateEvent.subscribe((userName) => {
            if(userName === this.sessionService.getCurrentCredentials()[0])
                this.loaduser();
        });

        this.loaduser();
    }

    ngOnDestroy() {
        this.userUpdateSubscription.unsubscribe();
    }

    loaduser() {
        this.loading = true;

        let currentUserName = this.sessionService.getCurrentCredentials()[0];

        this.operationsManager.getUser(this.sessionService.getCurrentCredentials()[0])
        .then(user => {
            this.loading = false;
            this.user = user;
        })
        .catch(error => this.loading = false);
    }

}
