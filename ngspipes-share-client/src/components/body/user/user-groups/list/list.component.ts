import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { Group } from '../../../../../entities/group';
import { GroupService } from '../../../../../services/group.service';
import { SessionService } from '../../../../../services/session.service';
import { DialogManager } from '../../../../dialog/dialog.manager';
import { Filter, TextFilter, IconFilter } from '../../../../utils/filter-list/filter-list.component';
import { OperationsManager } from '../../../../operations.manager';
import { Utils } from '../../../../utils/utils';

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

    filters : Filter[];



    constructor(private groupService : GroupService,
                private dialogManager : DialogManager,
                private sessionService : SessionService,
                private operationsManager : OperationsManager) {
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

        this.operationsManager.getGroupsAccessibleByUser(this.userName)
        .then(groups => {
            this.loading = false;
            this.groups = Utils.sort(groups, group => group.groupName);
        })
        .catch(error => this.loading = false);
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
