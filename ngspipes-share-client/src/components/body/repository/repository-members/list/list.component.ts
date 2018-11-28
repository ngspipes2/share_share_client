import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { RepositoryUserMember } from '../../../../../entities/repository-user-member';
import { RepositoryGroupMember } from '../../../../../entities/repository-group-member';
import { RepositoryUserMemberService } from '../../../../../services/repository-user-member.service';
import { RepositoryGroupMemberService } from '../../../../../services/repository-group-member.service';
import { DialogManager } from '../../../../dialog/dialog.manager';
import { Filter, TextFilter, IconFilter } from '../../../../utils/filter-list/filter-list.component';
import { OperationsManager } from '../../../../operations.manager';

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
    creatingUserMember : boolean;
    creatingGroupMember : boolean;
    userMembers : RepositoryUserMember[] = [];
    groupMembers : RepositoryGroupMember[] = [];
    members : any[];

    filters: Filter[] = [];



    constructor(private userMemberService : RepositoryUserMemberService,
                private groupMemberService : RepositoryGroupMemberService,
                private dialogManager : DialogManager,
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

        this.userMemberService.getMembersOfRepository(this.repositoryName)
        .then(members => {
            this.loading = false;
            this.userMembers = members;
            this.buildMembers();
        })
        .catch(error=>{
            this.loading = false;
            this.dialogManager.openErrorDialog("Error getting members of repository " + this.repositoryName + "!", error);
            console.error(error);
        });
    }

    loadGroupMembers() {
        this.loading = true;

        this.groupMemberService.getMembersOfRepository(this.repositoryName)
        .then(members => {
            this.loading = false;
            this.groupMembers = members;
            this.buildMembers();
        })
        .catch(error=>{
            this.loading = false;
            this.dialogManager.openErrorDialog("Error getting members of repository " + this.repositoryName + "!", error);
            console.error(error);
        });
    }

    buildMembers() {
        this.members = [];

        this.userMembers.forEach(member => this.members.push(member));
        this.groupMembers.forEach(member => this.members.push(member))

        this.members = this.members.sort((a, b) => {
            let aName = a.userName ? a.userName : a.groupName;
            let bName = b.userName ? b.userName : b.groupName;

            if (aName < bName)
                return -1;
            if (aName > bName)
                return 1;

            return 0;
        });
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

    addUserMemberClick() {
        this.creatingUserMember = true;

        let member = new RepositoryUserMember(0, null, null, this.repositoryName, false);

        this.operationsManager.createRepositoryUserMember(member)
        .then(() => this.creatingUserMember = false)
        .catch(() => this.creatingUserMember = false);
    }

    addGroupMemberClick() {
        this.creatingGroupMember = true;

        let member = new RepositoryGroupMember(0, null, null, this.repositoryName, false);

        this.operationsManager.createRepositoryGroupMember(member)
        .then(() => this.creatingGroupMember= false)
        .catch(() => this.creatingGroupMember = false);
    }

}
