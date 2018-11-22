import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Group } from '../../../../../entities/group';
import { GroupService } from '../../../../../services/group.service';
import { SessionService } from '../../../../../services/session.service';
import { DialogManager } from '../../../../dialog/dialog.manager';

@Component({
    selector: 'app-group-item',
    templateUrl: './group-item.component.html',
    styleUrls: ['./group-item.component.scss']
})
export class GroupItemComponent implements OnInit, OnDestroy {

    @Input()
    group : Group;

    loginSubscription : any;
    userName : string;
    isOwner : boolean;
    isMember : boolean;
    deleting : boolean;



    constructor(private sessionService : SessionService,
                private groupService : GroupService,
                private dialogManager : DialogManager,
                private router : Router) { }



    ngOnInit() {
        this.loginSubscription = this.sessionService.loginEvent.subscribe(() => this.load());
        this.load();
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
    }

    load() {
        this.userName = this.sessionService.getCurrentCredentials()[0];
        this.isOwner = this.group.ownerName === this.userName;
        this.isMember = this.group.ownerName !== this.userName;
    }

    deleteClick(event : any) {
        this.dialogManager.openWarningDialog(
            "Delete Group",
            "Are you sure you want to delete " + this.group.groupName + "?",
            ["Yes", "No"]
        ).afterClosed().subscribe(response => {
            if(response === "Yes")
                this.deleteGroup();
        });

        event.stopPropagation();
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

    elementClick() {
        this.router.navigate(["/groups/" + this.group.groupName]);
    }

}
