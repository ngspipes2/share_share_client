import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { GroupMember } from '../../../../../entities/group-member';
import { GroupMemberService } from '../../../../../services/group-member.service';
import { DialogManager } from '../../../../dialog/dialog.manager';


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
    loading : boolean;



    constructor(private groupMemberService : GroupMemberService,
                private dialogManager : DialogManager) { }



    ngOnInit() {
        this.isRead = !this.member.writeAccess;
        this.isWrite = this.member.writeAccess;
    }

    deleteClick() {
        this.dialogManager.openWarningDialog(
            "Delete Member",
            "Are you sure you want to delete " + this.member.userName + "?",
            ["Yes", "No"]
        ).afterClosed().subscribe(response => {
            if(response === "Yes")
                this.deleteMember();
        });
    }

    deleteMember() {
        this.deleting = true;

        this.groupMemberService.deleteMember(this.member.id)
        .then(result => {
            this.deleting = false;
            if(!result)
                this.dialogManager.openErrorDialog("Member could not be deleted!", "Group could not be deleted. Please try again later.");
        })
        .catch(error => {
            this.deleting = false;
            this.dialogManager.openErrorDialog("Error deleting Member!", error);
            console.error(error);
        });
    }

    writeAccessClick() {
        this.loading = true;

        this.groupMemberService.updateMember(this.member)
        .then(result => {
            this.loading = false;
            if(!result)
                this.dialogManager.openErrorDialog("Access could not be changed!", "Access could not be changed! Please try again latter.");
        })
        .catch(error => {
            this.loading = false;
            this.dialogManager.openErrorDialog("Error changing access!", error);
            console.error(error);
        });
    }

}
