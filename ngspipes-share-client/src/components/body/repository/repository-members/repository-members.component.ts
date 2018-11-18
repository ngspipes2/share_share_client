import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { RepositoryUserMember }  from '../../../../entities/repository-user-member';
import { RepositoryGroupMember }  from '../../../../entities/repository-group-member';
import { RepositoryUserMemberService }  from '../../../../services/repository-user-member.service';
import { RepositoryGroupMemberService }  from '../../../../services/repository-group-member.service';

import { DialogManager } from '../../../dialog/dialog.manager';

@Component({
  selector: 'app-repository-members',
  templateUrl: './repository-members.component.html',
  styleUrls: ['./repository-members.component.scss']
})
export class RepositoryMembersComponent {

    @Input()
    repositoryName : string;
    @Input()
    editable : boolean;

    loading : boolean;



    constructor(private userMemberService : RepositoryUserMemberService,
                private groupMemberService : RepositoryGroupMemberService,
                private dialogManager : DialogManager,
                private router : Router) { }



    addUserMemberClick() {
        this.dialogManager.openSelectUserDialog().afterClosed().subscribe(userName => {
            if(userName)
            this.createUserMember(userName);
        });
    }

    createUserMember(userName : string) {
        this.loading = true;

        let member = new RepositoryUserMember(0, null, userName, this.repositoryName, false);
        this.userMemberService.createMember(member)
        .then(id => {
            this.loading = false;
            this.dialogManager.openSuccessDialog("Member created successfully!", null);
        })
        .catch(error => {
            this.loading = false;
            this.dialogManager.openErrorDialog("Error creating member!", error);
            console.error(error);
        });
    }

    addGroupMemberClick() {
        this.dialogManager.openSelectGroupDialog().afterClosed().subscribe(groupName => {
            if(groupName)
                this.createGroupMember(groupName);
        });
    }

    createGroupMember(groupName : string) {
        this.loading = true;

        let member = new RepositoryGroupMember(0, null, groupName, this.repositoryName, false);
        this.groupMemberService.createMember(member)
        .then(id => {
            this.loading = false;
            this.dialogManager.openSuccessDialog("Member created successfully!", null);
        })
        .catch(error => {
            this.loading = false;
            this.dialogManager.openErrorDialog("Error creating member!", error);
            console.error(error);
        });
    }

}
