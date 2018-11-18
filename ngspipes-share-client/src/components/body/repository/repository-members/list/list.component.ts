import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { RepositoryUserMember } from '../../../../../entities/repository-user-member';
import { RepositoryGroupMember } from '../../../../../entities/repository-group-member';
import { RepositoryUserMemberService } from '../../../../../services/repository-user-member.service';
import { RepositoryGroupMemberService } from '../../../../../services/repository-group-member.service';
import { DialogManager } from '../../../../dialog/dialog.manager';

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
    members : any[] = [];

    filterText : string = "";
    filterAcceptReadAccess : boolean = true;
    filterAcceptWriteAccess : boolean = true;
    filterAcceptUser : boolean = true;
    filterAcceptGroup : boolean = true;



    constructor(private userMemberService : RepositoryUserMemberService,
                private groupMemberService : RepositoryGroupMemberService,
                private dialogManager : DialogManager) { }



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

    acceptUser(member : RepositoryUserMember) : boolean {
        if(member.userName.toLowerCase().indexOf(this.filterText.toLowerCase()) === -1)
            return false;

        if(!this.filterAcceptReadAccess && !member.writeAccess)
            return false;

        if(!this.filterAcceptWriteAccess && member.writeAccess)
            return false;

        if(!this.filterAcceptUser)
            return false;

        return true;
    }

    acceptGroup(member : RepositoryGroupMember) : boolean {
        if(member.groupName.toLowerCase().indexOf(this.filterText.toLowerCase()) === -1)
            return false;

        if(!this.filterAcceptReadAccess && !member.writeAccess)
            return false;

        if(!this.filterAcceptWriteAccess && member.writeAccess)
            return false;

        if(!this.filterAcceptGroup)
            return false;

        return true;
    }

}
