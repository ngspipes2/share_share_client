import { Component, OnInit, OnDestroy } from '@angular/core';

import { Group } from '../../../../../entities/group';
import { GroupService } from '../../../../../services/group.service';
import { SessionService } from '../../../../../services/session.service';
import { DialogManager } from '../../../../dialog/dialog.manager';
import { OperationsManager } from '../../../../operations.manager';

import { Filter, TextFilter, IconFilter } from '../../../../utils/filter-list/filter-list.component';

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

    filters : Filter[];



    constructor(private sessionService : SessionService,
                private groupService : GroupService,
                private dialogManager : DialogManager,
                private operationsManager : OperationsManager) {
        this.filters = [
            new TextFilter(this.acceptName.bind(this), "", "GroupName"),
            new IconFilter(this.acceptOwner.bind(this), true, "Owner", "person", null),
            new IconFilter(this.acceptMember.bind(this), true, "Member", "people", null)
        ];
    }



    ngOnInit() {
        this.loginSubscription = this.sessionService.loginEvent.subscribe(() => this.load());
        this.groupSubscription = this.groupService.groupEvent.subscribe(() => this.load());

        this.load();
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
        this.groupSubscription.unsubscribe();
    }

    load() {
        this.userName = this.sessionService.getCurrentCredentials()[0];
        this.groups = undefined;
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

    acceptName(group : Group, text : string) {
        let name = group.groupName.toLowerCase();
        text = text.toLowerCase();

        return name.indexOf(text) !== -1;
    }

    acceptOwner(group : Group, accept : boolean) : boolean {
        if(!accept && group.ownerName === this.userName)
            return false;

        return true;
    }

    acceptMember(group : Group, accept : boolean) : boolean {
        if(!accept && group.ownerName !== this.userName)
            return false;

        return true;
    }

    createGroupClick() : Promise<any> {
        let group = new Group(null, null, null, null);
        return this.operationsManager.createGroup(group);
    }

}
