import { Component, Input } from '@angular/core';

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



    constructor(private groupMemberService : RepositoryGroupMemberService,
                private dialogManager : DialogManager,
                private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.isRead = !this.member.writeAccess;
        this.isWrite = this.member.writeAccess;
    }

    deleteClick(event : any) : Promise<any> {
        event.stopPropagation();
        return this.operationsManager.deleteRepositoryGroupMember(this.member);
    }

    writeAccessClick(event : any) : Promise<any> {
        event.stopPropagation();
        return this.operationsManager.saveRepositoryGroupMember(this.member);
    }

}
