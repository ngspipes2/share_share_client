import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

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

    userUpdateSubscription : any;

    currentTheme : string;
    user : User;
    loadEvent : Subject<any> = new Subject();



    constructor(private sessionService : SessionService,
                private userService : UserService,
                private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.userUpdateSubscription = this.userService.userUpdateEvent.subscribe((userName) => {
            if(userName === this.sessionService.getCurrentCredentials()[0])
                this.loadEvent.next();
        });

        setTimeout(() => this.loadEvent.next());
    }

    ngOnDestroy() {
        this.userUpdateSubscription.unsubscribe();
    }

    load() : Promise<any> {
        let currentUserName = this.sessionService.getCurrentCredentials()[0];

        return this.operationsManager.getUser(currentUserName)
        .then(user => this.user = user);
    }

}
