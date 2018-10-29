import { Component, OnInit, OnDestroy } from '@angular/core';

import { User } from '../../../entities/user';
import { UserService } from '../../../services/user.service';
import { SessionService } from '../../../services/session.service';
import { DialogManager } from '../../dialog/dialog.manager';

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
                private dialogManager : DialogManager) { }



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
        this.userService.getUser(this.sessionService.getCurrentCredentials()[0])
            .then(user => {
                this.loading = false;
                this.user = user;
            })
            .catch(error => {
                this.loading = false;
                this.dialogManager.openErrorDialog("Error getting user " + this.user.userName, error);
                console.error(error);
            });
    }

}
