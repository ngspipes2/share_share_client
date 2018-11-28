import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { RepositoryUserMember } from '../../../../../entities/repository-user-member';
import { RepositoryUserMemberService } from '../../../../../services/repository-user-member.service';
import { OperationsManager } from '../../../../operations.manager';
import { DialogManager } from '../../../../dialog/dialog.manager';

@Component({
    selector: 'app-user-member-item',
    templateUrl: './user-member-item.component.html',
    styleUrls: ['./user-member-item.component.scss']
})
export class UserMemberItemComponent {

    @Input()
    repositoryName : string;
    @Input()
    member : RepositoryUserMember;
    @Input()
    editable : boolean;

    isRead : boolean;
    isWrite : boolean;
    deleting : boolean;
    changingAccess : boolean;



    constructor(private userMemberService : RepositoryUserMemberService,
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

        this.operationsManager.deleteRepositoryUserMember(this.member)
        .then(() => this.deleting = false)
        .catch(() => this.deleting = false);
    }

    writeAccessClick(event : any) {
        event.stopPropagation();

        if(!this.editable)
            return;

        this.changingAccess = true;

        this.member.writeAccess = !this.member.writeAccess;

        this.operationsManager.saveRepositoryUserMember(this.member)
        .then(() => this.changingAccess = false)
        .catch(() => this.changingAccess = false);
    }

    elementClick() {
        this.router.navigate(["/users/" + this.member.userName]);
    }

}
