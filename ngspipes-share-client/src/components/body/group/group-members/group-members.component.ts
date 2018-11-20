import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { GroupMember } from '../../../../entities/group-member';
import { GroupMemberService } from '../../../../services/group-member.service';
import { DialogManager } from '../../../dialog/dialog.manager';

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

    creating : boolean;



    constructor(private groupMemberService : GroupMemberService,
                private dialogManager : DialogManager,
                private router : Router) { }



    addMemberClick() {
        this.dialogManager.openSelectUserDialog().afterClosed().subscribe(userName => {
            if(userName)
                this.createMember(userName);
        });
    }

    createMember(userName : string) {
        this.creating = true;

        let member = new GroupMember(0, null, userName, this.groupName, false);
        this.groupMemberService.createMember(member)
        .then(id => {
            this.creating = false;
            this.dialogManager.openSuccessDialog("Member created successfully!", null);
        })
        .catch(error => {
            this.creating = false;
            this.dialogManager.openErrorDialog("Error creating member!", error);
            console.error(error);
        });
    }

}
