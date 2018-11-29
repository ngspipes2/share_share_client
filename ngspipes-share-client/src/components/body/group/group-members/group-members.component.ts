import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { GroupMember } from '../../../../entities/group-member';
import { GroupMemberService } from '../../../../services/group-member.service';
import { DialogManager } from '../../../dialog/dialog.manager';
import { OperationsManager } from '../../../operations.manager';

@Component({
    selector: 'app-group-members',
    templateUrl: './group-members.component.html',
    styleUrls: ['./group-members.component.scss']
})
export class GroupMembersComponent {

    @Input()
    groupName : string;
    @Input()
    editable : boolean;



    constructor(private operationsManager : OperationsManager) { }



    addMemberClick() : Promise<any> {
        let member = new GroupMember(0, null, null, this.groupName, false);

        return this.operationsManager.createGroupMember(member);
    }

}
