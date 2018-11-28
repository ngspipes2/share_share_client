import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Group } from '../../../../../entities/group';
import { SessionService } from '../../../../../services/session.service';
import { OperationsManager } from '../../../../operations.manager';

@Component({
    selector: 'app-group-item',
    templateUrl: './group-item.component.html',
    styleUrls: ['./group-item.component.scss']
})
export class GroupItemComponent implements OnInit, OnDestroy {

    @Input()
    group : Group;

    loginSubscription : any;
    userName : string;
    isOwner : boolean;
    isMember : boolean;
    deleting : boolean;



    constructor(private router : Router,
                private sessionService : SessionService,
                private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.loginSubscription = this.sessionService.loginEvent.subscribe(() => this.load());
        this.load();
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
    }

    load() {
        this.userName = this.sessionService.getCurrentCredentials()[0];
        this.isOwner = this.group.ownerName === this.userName;
        this.isMember = this.group.ownerName !== this.userName;
    }

    deleteClick(event : any) {
        event.stopPropagation();

        this.deleting = true;

        this.operationsManager.deleteGroup(this.group)
        .then(() => this.deleting = false)
        .catch(() => this.deleting = false);
    }

    elementClick() {
        this.router.navigate(["/groups/" + this.group.groupName]);
    }

}
