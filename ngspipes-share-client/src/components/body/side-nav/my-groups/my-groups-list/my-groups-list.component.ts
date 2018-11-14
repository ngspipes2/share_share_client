import { Component, OnInit, OnDestroy } from '@angular/core';

import { Group } from '../../../../../entities/group';
import { GroupService } from '../../../../../services/group.service';
import { SessionService } from '../../../../../services/session.service';
import { DialogManager } from '../../../../dialog/dialog.manager';

@Component({
    selector: 'app-my-groups-list',
    templateUrl: './my-groups-list.component.html',
    styleUrls: ['./my-groups-list.component.scss']
})
export class MyGroupsListComponent implements OnInit, OnDestroy {

    loginSubscription : any;
    groupSubscription : any;

    loading : boolean;
    userName : string;
    groups : Group[] = [];

    filterText : string = "";
    filterAcceptOwner : boolean = true;
    filterAcceptMember : boolean = true;



    constructor(private sessionService : SessionService,
                private groupService : GroupService,
                private dialogManager : DialogManager) { }



    ngOnInit() {
        this.loginSubscription = this.sessionService.loginEvent.subscribe(() => this.load());
        this.groupSubscription = this.groupService.groupEvent.subscribe(() => this.load());

        this.load();
    }

    ngOnDestroy() {
        this.loginSubscription.unsunscribe();
        this.groupSubscription.unsunscribe();
    }

    load() {
        this.userName = this.sessionService.getCurrentCredentials()[0];

        this.loading = true;

        this.groupService.getGroupsAccessibleByUser(this.userName)
        .then(groups => {
            this.loading = false;
            this.groups = groups;
            this.groups = this.groups.sort((a,b) => {
                if (a.groupName < b.groupName)
                    return -1;
                if (a.groupName > b.groupName)
                    return 1;

                return 0;
            });
        })
        .catch(error=>{
            this.loading = false;
            this.dialogManager.openErrorDialog("Error getting groups of current user!", error);
            console.error(error);
        });
    }

    accept(group : Group) : boolean {
        if(group.groupName.toLowerCase().indexOf(this.filterText.toLowerCase()) === -1)
            return false;

        if(!this.filterAcceptOwner && group.ownerName === this.userName)
            return false;

        if(!this.filterAcceptMember && group.ownerName !== this.userName)
            return false;

        return true;
    }

}
