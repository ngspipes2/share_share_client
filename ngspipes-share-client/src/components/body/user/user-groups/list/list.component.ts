import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { Group } from '../../../../../entities/group';
import { GroupService } from '../../../../../services/group.service';
import { DialogManager } from '../../../../dialog/dialog.manager';

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
    groups : Group[] = [];

    filterText : string = "";
    filterAcceptOwner : boolean = true;
    filterAcceptMember : boolean = true;



    constructor(private groupService : GroupService,
                private dialogManager : DialogManager) { }



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
