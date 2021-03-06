import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { Group } from '../../../entities/group';
import { SessionService } from '../../../services/session.service';
import { GroupService } from '../../../services/group.service';

import { OperationsManager } from '../../operations.manager';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, OnDestroy {

    loginSubscription : any;
    logoutSubscription : any;
    paramsSubscription : any;
    groupCreateSubscription : any;
    groupDeleteSubscription : any;

    groupName : string;
    editable : boolean;
    loadEvent : Subject<any> = new Subject();

    group : Group;



    constructor(private sessionService : SessionService,
                private activatedRoute : ActivatedRoute,
                private groupService : GroupService,
                private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.loginSubscription = this.sessionService.loginEvent.subscribe(() => {
            this.checkEditable();
        });

        this.logoutSubscription = this.sessionService.logoutEvent.subscribe(() => {
            this.checkEditable();
        });

        this.paramsSubscription = this.activatedRoute.params.subscribe(() => {
            if(this.groupName !== this.activatedRoute.snapshot.params.groupName) {
                this.groupName = this.activatedRoute.snapshot.params.groupName;
                setTimeout(() => this.loadEvent.next());
            }
        });

        this.groupCreateSubscription = this.groupService.groupCreateEvent.subscribe((groupName) => {
            if(this.groupName === groupName)
                this.loadEvent.next();
        });

        this.groupDeleteSubscription = this.groupService.groupDeleteEvent.subscribe((groupName) => {
            if(this.groupName === groupName)
                this.loadEvent.next();
        });
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
        this.logoutSubscription.unsubscribe();
        this.paramsSubscription.unsubscribe();
        this.groupCreateSubscription.unsubscribe();
        this.groupDeleteSubscription.unsubscribe();
    }

    load() : Promise<any> {
        return this.loadGroup()
        .then(() => this.checkEditable());
    }

    loadGroup() : Promise<Group> {
        return this.operationsManager.getGroup(this.groupName)
        .then(group => {
            this.group = group;
            return group;
        });
    }

    checkEditable() {
        let currentUserName = this.sessionService.getCurrentCredentials()[0];
        this.editable = this.group.ownerName === currentUserName;
    }

}
