import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Group } from '../../../../entities/group';
import { GroupService } from '../../../../services/group.service';
import { SessionService } from '../../../../services/session.service';
import { DialogManager } from '../../../dialog/dialog.manager';

@Component({
    selector: 'app-my-groups',
    templateUrl: './my-groups.component.html',
    styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent {

    creating : boolean;



    constructor(private router : Router,
                private groupService : GroupService,
                private sessionService : SessionService,
                private dialogManager : DialogManager) { }



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
