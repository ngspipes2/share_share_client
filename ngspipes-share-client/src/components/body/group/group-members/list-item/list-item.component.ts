import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { GroupMember } from '../../../../../entities/group-member';
import { GroupMemberService } from '../../../../../services/group-member.service';
import { DialogManager } from '../../../../dialog/dialog.manager';
import { OperationsManager } from '../../../../operations.manager';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

    @Input()
    groupName : string;
    @Input()
    member : GroupMember;
    @Input()
    editable : boolean;

    isRead : boolean;
    isWrite : boolean;
    deleting : boolean;
    changingAccess : boolean;



    constructor(private groupMemberService : GroupMemberService,
                private dialogManager : DialogManager,
                private router : Router,
                private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.isRead = !this.member.writeAccess;
        this.isWrite = this.member.writeAccess;
    }

    deleteClick(event : any) {
        event.stopPropagation();

        this.deleting = true;

        this.operationsManager.deleteGroupMember(this.member)
        .then(() => this.deleting = false)
        .catch(() => this.deleting = false);
    }

    writeAccessClick(event : any) {
        event.stopPropagation();

        if(!this.editable)
            return;

        this.changingAccess = true;

        this.member.writeAccess = !this.member.writeAccess;

        this.operationsManager.saveGroupMember(this.member)
        .then(() => this.changingAccess = false)
        .catch(() => this.changingAccess = false);
    }

    elementClick() {
        this.router.navigate(["/users/" + this.member.userName]);
    }

}
