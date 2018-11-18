import { Component, Input } from '@angular/core';

import { RepositoryUserMember } from '../../../../../entities/repository-user-member';
import { RepositoryUserMemberService } from '../../../../../services/repository-user-member.service';

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
    loading : boolean;



    constructor(private userMemberService : RepositoryUserMemberService,
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

        this.userMemberService.deleteMember(this.member.id)
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

    writeAccessClick() {
        this.loading = true;

        this.userMemberService.updateMember(this.member)
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
