import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RepositoryGroupMember } from '../../../../../entities/repository-group-member';
import { RepositoryGroupMemberService } from '../../../../../services/repository-group-member.service';

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
                private router : Router) { }



    ngOnInit() {
        this.isRead = !this.member.writeAccess;
        this.isWrite = this.member.writeAccess;
    }

    deleteClick(event : any) {
        this.dialogManager.openWarningDialog(
            "Delete Member",
            "Are you sure you want to delete " + this.member.groupName + "?",
            ["Yes", "No"]
        ).afterClosed().subscribe(response => {
            if(response === "Yes")
                this.deleteMember();
        });

        event.stopPropagation();
    }

    deleteMember() {
        this.deleting = true;

        this.groupMemberService.deleteMember(this.member.id)
        .then(result => {
            this.deleting = false;
            if(!result)
                this.dialogManager.openErrorDialog("Member could not be deleted!", "Member could not be deleted. Please try again later.");
        })
        .catch(error => {
            this.deleting = false;
            this.dialogManager.openErrorDialog("Error deleting Member!", error);
            console.error(error);
        });
    }

    writeAccessClick(event : any) {
        event.stopPropagation();

        if(!this.editable)
            return;

        this.changingAccess = true;

        this.member.writeAccess = !this.member.writeAccess;

        this.groupMemberService.updateMember(this.member)
        .then(result => {
            this.changingAccess = false;
            if(!result)
                this.dialogManager.openErrorDialog("Access could not be changed!", "Access could not be changed! Please try again latter.");
        })
        .catch(error => {
            this.changingAccess = false;
            this.dialogManager.openErrorDialog("Error changing access!", error);
            console.error(error);
        });
    }

    elementClick() {
        this.router.navigate(["/groups/" + this.member.groupName]);
    }

}
