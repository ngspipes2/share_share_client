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



    constructor(private userMemberService : RepositoryUserMemberService,
                private dialogManager : DialogManager,
                private router : Router,
                private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.isRead = !this.member.writeAccess;
        this.isWrite = this.member.writeAccess;
    }

    deleteClick(event : any) : Promise<any> {
        event.stopPropagation();
        return this.operationsManager.deleteRepositoryUserMember(this.member);
    }

    writeAccessClick(event : any) : Promise<any> {
        event.stopPropagation();
        return this.operationsManager.saveRepositoryUserMember(this.member);
    }

    elementClick() {
        this.router.navigate(["/users/" + this.member.userName]);
    }

}
