import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { GroupMember } from '../../../../../entities/group-member';
import { GroupMemberService } from '../../../../../services/group-member.service';
import { DialogManager } from '../../../../dialog/dialog.manager';

import { Filter, IconFilter, TextFilter } from '../../../../utils/filter-list/filter-list.component';

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

    filters : Filter[];



    constructor(private groupMemberService : GroupMemberService,
                private dialogManager : DialogManager) {
        this.filters = [
            new TextFilter(this.acceptName.bind(this), "", "MemberName"),
            new IconFilter(this.acceptReadAccess.bind(this), true, "Read Access", null, "pencil-off"),
            new IconFilter(this.acceptWriteAccess.bind(this), true, "Write Access", null, "pencil")
        ];
    }



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
        this.members = undefined;
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

    acceptName(member : GroupMember, text : string) {
        let name = member.userName.toLowerCase();
        text = text.toLowerCase();

        return name.indexOf(text) !== -1;
    }

    acceptReadAccess(member : any, accept : boolean) : boolean {
        if(!accept && !member.writeAccess)
            return false;

        return true;
    }

    acceptWriteAccess(member : any, accept : boolean) : boolean {
        if(!accept && member.writeAccess)
            return false;

        return true;
    }

}
