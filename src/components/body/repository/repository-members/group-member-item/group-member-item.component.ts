import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { RepositoryGroupMember } from '../../../../../entities/repository-group-member';
import { OperationsManager } from '../../../../operations.manager';

@Component({
    selector: 'app-group-member-item',
    templateUrl: './group-member-item.component.html',
    styleUrls: ['./group-member-item.component.scss']
})
export class GroupMemberItemComponent implements OnInit, OnChanges {

    @Input()
    repositoryName : string;
    @Input()
    member : RepositoryGroupMember;
    @Input()
    editable : boolean;

    isRead : boolean;
    isWrite : boolean;



    constructor(private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.load();
    }

    ngOnChanges() {
        this.load();
    }

    load() {
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
