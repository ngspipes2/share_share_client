import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../../entities/user';
import { UserService } from '../../../services/user.service';
import { SessionService } from '../../../services/session.service';

import { DialogManager } from '../../dialog/dialog.manager';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

    loginSubscription : any;
    logoutSubscription : any;
    paramsSubscription : any;
    userCreateSubscription : any;
    userDeleteSubscription : any;

    userName : string;
    editable : boolean;
    loading : boolean;

    user : User



    constructor(private sessionService : SessionService,
                private activatedRoute : ActivatedRoute,
                private userService : UserService,
                private dialogManager : DialogManager,
                private router : Router) { }



    ngOnInit() {
        this.loginSubscription = this.sessionService.loginEvent.subscribe(() => {
            this.load();
        });

        this.logoutSubscription = this.sessionService.logoutEvent.subscribe(() => {
            this.load();
        });

        this.paramsSubscription = this.activatedRoute.params.subscribe(() => {
            if(this.userName !== this.activatedRoute.snapshot.params.userName) {
                this.userName = this.activatedRoute.snapshot.params.userName;
                this.load();
            }
        });

        this.userCreateSubscription = this.userService.userCreateEvent.subscribe(userName => {
            if(this.userName === userName)
                this.load();
        });

        this.userDeleteSubscription = this.userService.userDeleteEvent.subscribe(userName => {
            if(this.userName === userName)
                this.load();
        });
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
        this.logoutSubscription.unsubscribe();
        this.paramsSubscription.unsubscribe();
        this.userCreateSubscription.unsubscribe();
        this.userDeleteSubscription.unsubscribe();
    }

    load() {
        this.loading = true;

        this.loadUser()
        .then(() => {
            this.loading = false;
            this.checkEditable();
        })
        .catch(() => {
            this.loading = false;
        });
    }

    loadUser() : Promise<User> {
        return this.userService.getUser(this.userName)
        .then(user => {
            this.user = user;

            if(!user)
                this.dialogManager.openWarningDialog("There is no User " + this.userName, null);

            return user;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error getting User!", error);
            console.error(error);
            throw error;
        });
    }

    checkEditable() {
        let currentUserName = this.sessionService.getCurrentCredentials()[0];
        this.editable = this.userName === currentUserName;
    }

}
