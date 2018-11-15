import { Component, Input } from '@angular/core';

import { Group } from '../../../../../entities/group';
import { GroupService } from '../../../../../services/group.service';
import { DialogManager } from '../../../../dialog/dialog.manager';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

    @Input()
    userName : string;
    @Input()
    group : Group;
    @Input()
    editable : boolean;

    isOwner : boolean;
    isMember : boolean;
    deleting : boolean;



    constructor(private groupService : GroupService,
                private dialogManager : DialogManager) { }



    ngOnInit() {
        this.isOwner = this.group.ownerName === this.userName;
        this.isMember = this.group.ownerName !== this.userName;
    }

    deleteClick() {
        this.dialogManager.openWarningDialog(
            "Delete Group",
            "Are you sure you want to delete " + this.group.groupName + "?",
            ["Yes", "No"]
        ).afterClosed().subscribe(response => {
            if(response === "Yes")
                this.deleteGroup();
        });
    }

    deleteGroup() {
        this.deleting = true;

        this.groupService.deleteGroup(this.group.groupName)
        .then(result => {
            this.deleting = false;
            if(!result)
                this.dialogManager.openErrorDialog("Group could not be deleted!", "Grouup could not be deleted. Please try again later.");
        })
        .catch(error => {
            this.deleting = false;
            this.dialogManager.openErrorDialog("Error deleting Group!", error);
            console.error(error);
        });
    }

}
