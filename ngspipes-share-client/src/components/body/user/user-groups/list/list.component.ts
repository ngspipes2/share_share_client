import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router }  from '@angular/router';

import { Group } from '../../../../../entities/group';
import { GroupService } from '../../../../../services/group.service';
import { SessionService } from '../../../../../services/session.service';
import { DialogManager } from '../../../../dialog/dialog.manager';
import { Filter, TextFilter, IconFilter } from '../../../../utils/filter-list/filter-list.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy, OnChanges {

    @Input()
    userName : string;
    @Input()
    editable : boolean;

    groupSubscription : any;

    loading : boolean;
    creating : boolean;
    groups : Group[] = [];

    filters : Filter[];



    constructor(private groupService : GroupService,
                private dialogManager : DialogManager,
                private sessionService : SessionService,
                private router : Router) {
        this.filters = [
            new TextFilter(this.acceptName.bind(this), "", "GroupName"),
            new IconFilter(this.acceptOwner.bind(this), true, "Owner", "person", null),
            new IconFilter(this.acceptMember.bind(this), true, "Member", "people", null)
        ];
    }



    ngOnInit() {
        this.groupSubscription = this.groupService.groupEvent.subscribe(() => this.load());
        this.load();
    }

    ngOnDestroy() {
        this.groupSubscription.unsubscribe();
    }

    ngOnChanges() {
        this.load();
    }

    load() {
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
            this.dialogManager.openErrorDialog("Error getting groups of user " + this.userName + "!", error);
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

    createGroupClick() {
        this.dialogManager.openNewGroupNameDialog().afterClosed().subscribe((groupName) => {
            if(!groupName)
                return;

            let userName = this.sessionService.getCurrentCredentials()[0];
            let group = new Group(groupName, null, null, userName);

            this.creating = true;
            this.groupService.createGroup(group)
            .then(() => {
                this.creating = false;
                this.dialogManager.openSuccessDialog("Group created successfully!", null);
                this.router.navigate(['/groups/' + groupName]);
            })
            .catch(error => {
                this.creating = false;
                this.dialogManager.openErrorDialog("Error creating Group!", error);
                console.error(error);
            });
        });
    }

}
