import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { RepositoryGroupMember } from '../../../../../entities/repository-group-member';
import { RepositoryGroupMemberService } from '../../../../../services/repository-group-member.service';
import { OperationsManager } from '../../../../operations.manager';
import { DialogManager } from '../../../../dialog/dialog.manager';

@Component({
    selector: 'app-group-member-item',
    templateUrl: './group-member-item.component.html',
    styleUrls: ['./group-member-item.component.scss']
})
export class GroupMemberItemComponent {

    @Input()
    repositoryName : string;
    @Input()
    member : RepositoryGroupMember;
    @Input()
    editable : boolean;

    isRead : boolean;
    isWrite : boolean;
    deleting : boolean;
    changingAccess : boolean;



    constructor(private groupMemberService : RepositoryGroupMemberService,
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

        this.operationsManager.deleteRepositoryGroupMember(this.member)
        .then(() => this.deleting = false)
        .catch(() => this.deleting = false);
    }

    writeAccessClick(event : any) {
        event.stopPropagation();

        if(!this.editable)
            return;

        this.changingAccess = true;

        this.member.writeAccess = !this.member.writeAccess;

        this.operationsManager.saveRepositoryGroupMember(this.member)
        .then(() => this.changingAccess = false)
        .catch(() => this.changingAccess = false);
    }

    elementClick() {
        this.router.navigate(["/groups/" + this.member.groupName]);
    }

}
