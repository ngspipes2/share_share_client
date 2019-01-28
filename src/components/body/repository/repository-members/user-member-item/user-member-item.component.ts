import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { RepositoryUserMember } from '../../../../../entities/repository-user-member';
import { OperationsManager } from '../../../../operations.manager';

@Component({
    selector: 'app-user-member-item',
    templateUrl: './user-member-item.component.html',
    styleUrls: ['./user-member-item.component.scss']
})
export class UserMemberItemComponent implements OnInit, OnChanges {

    @Input()
    repositoryName : string;
    @Input()
    member : RepositoryUserMember;
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
        return this.operationsManager.deleteRepositoryUserMember(this.member);
    }

    writeAccessClick(event : any) : Promise<any> {
        event.stopPropagation();
        return this.operationsManager.saveRepositoryUserMember(this.member);
    }

}
