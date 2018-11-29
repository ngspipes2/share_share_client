import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { RepositoryUserMember }  from '../../../../entities/repository-user-member';
import { RepositoryGroupMember }  from '../../../../entities/repository-group-member';
import { RepositoryUserMemberService }  from '../../../../services/repository-user-member.service';
import { RepositoryGroupMemberService }  from '../../../../services/repository-group-member.service';

import { DialogManager } from '../../../dialog/dialog.manager';

import { OperationsManager } from '../../../operations.manager';

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



    constructor(private operationsManager : OperationsManager) { }



    addUserMemberClick() : Promise<any> {
        let member = new RepositoryUserMember(0, null, null, this.repositoryName, false);
        return this.operationsManager.createRepositoryUserMember(member);
    }

    addGroupMemberClick() : Promise<any> {
        let member = new RepositoryGroupMember(0, null, null, this.repositoryName, false);
        return this.operationsManager.createRepositoryGroupMember(member);
    }

}
