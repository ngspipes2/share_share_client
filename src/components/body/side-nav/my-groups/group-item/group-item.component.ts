import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';

import { Group } from '../../../../../entities/group';
import { SessionService } from '../../../../../services/session.service';
import { OperationsManager } from '../../../../operations.manager';

@Component({
    selector: 'app-group-item',
    templateUrl: './group-item.component.html',
    styleUrls: ['./group-item.component.scss']
})
export class GroupItemComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    group : Group;

    loginSubscription : any;
    userName : string;
    isOwner : boolean;
    isMember : boolean;



    constructor(private sessionService : SessionService,
                private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.loginSubscription = this.sessionService.loginEvent.subscribe(() => this.load());
        this.load();
    }

    ngOnChanges() {
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

    deleteClick(event : any) : Promise<any> {
        event.stopPropagation();
        return this.operationsManager.deleteGroup(this.group);
    }

}
