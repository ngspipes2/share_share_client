import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Group } from '../../../../entities/group';
import { GroupService } from '../../../../services/group.service';
import { SessionService } from '../../../../services/session.service';
import { DialogManager } from '../../../dialog/dialog.manager';

@Component({
    selector: 'app-user-groups',
    templateUrl: './user-groups.component.html',
    styleUrls: ['./user-groups.component.scss']
})
export class UserGroupsComponent {

    @Input()
    userName : string;
    @Input()
    editable : boolean;

    creating : boolean;



    constructor(private sessionService : SessionService,
                private groupService : GroupService,
                private dialogManager : DialogManager,
                private router : Router) { }



    createGroupClick() {
        this.dialogManager.openNewGroupNameDialog().afterClosed().subscribe((groupName) => {
            if(!groupName)
                return;

            let userName = this.sessionService.getCurrentCredentials()[0];
            let group = new Group(groupName, null, null, userName);

            this.creating = true;
            this.groupService.createGroup(group)
            .then(() => {
                this.creating = false;
                this.dialogManager.openSuccessDialog("Group created successfully!", null);
                this.router.navigate(['/groups/' + groupName]);
            })
            .catch(error => {
                this.creating = false;
                this.dialogManager.openErrorDialog("Error creating Group!", error);
                console.error(error);
            });
        });
    }

}
