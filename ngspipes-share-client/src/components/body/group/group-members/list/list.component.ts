import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { GroupMember } from '../../../../../entities/group-member';
import { GroupMemberService } from '../../../../../services/group-member.service';
import { DialogManager } from '../../../../dialog/dialog.manager';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy, OnChanges {

    @Input()
    groupName : string;
    @Input()
    editable : boolean;

    memberSubscription : any;

    loading : boolean;
    members : GroupMember[] = [];

    filterText : string = "";
    filterAcceptReadAccess : boolean = true;
    filterAcceptWriteAccess : boolean = true;



    constructor(private groupMemberService : GroupMemberService,
                private dialogManager : DialogManager) { }



    ngOnInit() {
        this.memberSubscription = this.groupMemberService.memberEvent.subscribe(() => this.load());
        this.load();
    }

    ngOnDestroy() {
        this.memberSubscription.unsubscribe();
    }

    ngOnChanges() {
        this.load();
    }

    load() {
        this.loading = true;

        this.groupMemberService.getMembersOfGroup(this.groupName)
        .then(members => {
            this.loading = false;
            this.members = members;
            this.members = this.members.sort((a,b) => {
                if (a.groupName < b.groupName)
                    return -1;
                if (a.groupName > b.groupName)
                    return 1;

                return 0;
            });
        })
        .catch(error=>{
            this.loading = false;
            this.dialogManager.openErrorDialog("Error getting members of group " + this.groupName + "!", error);
            console.error(error);
        });
    }

    accept(member : GroupMember) : boolean {
        if(member.userName.toLowerCase().indexOf(this.filterText.toLowerCase()) === -1)
            return false;

        if(!this.filterAcceptReadAccess && !member.writeAccess)
            return false;

        if(!this.filterAcceptWriteAccess && member.writeAccess)
            return false;

        return true;
    }

}
