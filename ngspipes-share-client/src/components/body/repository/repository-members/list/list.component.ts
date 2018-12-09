import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { RepositoryUserMember } from '../../../../../entities/repository-user-member';
import { RepositoryGroupMember } from '../../../../../entities/repository-group-member';
import { RepositoryUserMemberService } from '../../../../../services/repository-user-member.service';
import { RepositoryGroupMemberService } from '../../../../../services/repository-group-member.service';

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
    repositoryName : string;
    @Input()
    editable : boolean;

    userMemberSubscription : any;
    groupMemberSubscription : any;

    loading : boolean;
    userMembers : RepositoryUserMember[] = [];
    groupMembers : RepositoryGroupMember[] = [];
    members : any[];

    filters: Filter[] = [];



    constructor(private userMemberService : RepositoryUserMemberService,
                private groupMemberService : RepositoryGroupMemberService,
                private operationsManager : OperationsManager) {
        this.filters = [
            new TextFilter(this.acceptName.bind(this), "", "MemberName"),
            new IconFilter(this.acceptReadAccess.bind(this), true, "Read Access", null, "pencil-off"),
            new IconFilter(this.acceptWriteAccess.bind(this), true, "Write Access", null, "pencil"),
            new IconFilter(this.acceptUser.bind(this), true, "User", "person", null),
            new IconFilter(this.acceptGroup.bind(this), true, "Group", "people", null)
        ];
    }



    ngOnInit() {
        this.userMemberSubscription = this.userMemberService.memberEvent.subscribe(() => this.load());
        this.groupMemberSubscription = this.groupMemberService.memberEvent.subscribe(() => this.load());
        this.load();
    }

    ngOnDestroy() {
        this.userMemberSubscription.unsubscribe();
        this.groupMemberSubscription.unsubscribe();
    }

    ngOnChanges() {
        this.load();
    }

    load() {
        this.members = undefined;

        this.loadUserMembers();
        this.loadGroupMembers();
    }

    loadUserMembers() {
        this.loading = true;

        this.operationsManager.getUsersMembersOfRepository(this.repositoryName)
        .then(members => {
            this.loading = false;
            this.userMembers = members;
            this.buildMembers();
        })
        .catch(error => this.loading = false);
    }

    loadGroupMembers() {
        this.loading = true;

        this.operationsManager.getGroupsMembersOfRepository(this.repositoryName)
        .then(members => {
            this.loading = false;
            this.groupMembers = members;
            this.buildMembers();
        })
        .catch(error => this.loading = false);
    }

    buildMembers() {
        this.members = [];

        this.userMembers.forEach(member => this.members.push(member));
        this.groupMembers.forEach(member => this.members.push(member))

        this.members = Utils.sort(this.members, member => member.userName ? member.userName : member.groupName);
    }

    acceptName(member : any, text : string) {
        let name = member.userName ? member.userName : member.groupName;
        name = name.toLowerCase();
        text = text.toLowerCase();

        return name.indexOf(text) !== -1;
    }

    acceptReadAccess(member : any, accept : boolean) : boolean {
        if(!accept && !member.writeAccess)
            return false;

        return true;
    }

    acceptWriteAccess(member : any, accept : boolean) : boolean {
        if(!accept && member.writeAccess)
            return false;

        return true;
    }

    acceptUser(member : any, accept : boolean) : boolean {
        if(!accept && member.userName)
            return false;

        return true;
    }

    acceptGroup(member : any, accept : boolean) : boolean {
        if(!accept && member.groupName)
            return false;

        return true;
    }

    addUserMemberClick() : Promise<any> {
        let member = new RepositoryUserMember(0, null, null, this.repositoryName, false);
        return this.operationsManager.createRepositoryUserMember(member);
    }

    addGroupMemberClick() : Promise<any> {
        let member = new RepositoryGroupMember(0, null, null, this.repositoryName, false);
        return this.operationsManager.createRepositoryGroupMember(member);
    }

}
