import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from '../../../entities/user';
import { UserService } from '../../../services/user.service';
import { SessionService } from '../../../services/session.service';

import { OperationsManager } from '../../operations.manager';

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
    loadEvent : Subject<any> = new Subject();

    user : User



    constructor(private sessionService : SessionService,
                private activatedRoute : ActivatedRoute,
                private userService : UserService,
                private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.loginSubscription = this.sessionService.loginEvent.subscribe(() => {
            this.checkEditable();
        });

        this.logoutSubscription = this.sessionService.logoutEvent.subscribe(() => {
            this.checkEditable();
        });

        this.paramsSubscription = this.activatedRoute.params.subscribe(() => {
            if(this.userName !== this.activatedRoute.snapshot.params.userName) {
                this.userName = this.activatedRoute.snapshot.params.userName;
                setTimeout(() => this.loadEvent.next());
            }
        });

        this.userCreateSubscription = this.userService.userCreateEvent.subscribe(userName => {
            if(this.userName === userName)
                this.loadEvent.next();
        });

        this.userDeleteSubscription = this.userService.userDeleteEvent.subscribe(userName => {
            if(this.userName === userName)
                this.loadEvent.next();
        });
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
        this.logoutSubscription.unsubscribe();
        this.paramsSubscription.unsubscribe();
        this.userCreateSubscription.unsubscribe();
        this.userDeleteSubscription.unsubscribe();
    }

    load() : Promise<any> {
        this.checkEditable();
        return this.loadUser();
    }

    loadUser() : Promise<User> {
        return this.operationsManager.getUser(this.userName)
        .then(user => {
            this.user = user;
            return user;
        });
    }

    checkEditable() {
        let currentUserName = this.sessionService.getCurrentCredentials()[0];
        this.editable = this.userName === currentUserName;
    }

}
