import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { GroupService } from '../../../services/group.service';

@Component({
    selector: 'app-new-group-name-dialog',
    templateUrl: './new-group-name-dialog.component.html',
    styleUrls: ['./new-group-name-dialog.component.scss']
})
export class NewGroupNameDialogComponent implements OnInit, OnDestroy {

    groupSubscription : any;
    groupName : string = "";
    groupsNames : string[] = [];
    loading : boolean;
    nameNotAvailable : boolean;



    constructor(private dialogRef: MatDialogRef<NewGroupNameDialogComponent>,
                private groupService : GroupService) { }



    ngOnInit() {
        this.groupSubscription = this.groupService.groupEvent.subscribe(() => this.load());
        this.load();
    }

    ngOnDestroy() {
        this.groupSubscription.unsubscribe();
    }

    load() {
        this.loading = true;

        this.groupService.getGroupsNames()
        .then(groupsNames => {
            this.loading = false;
            this.groupsNames = groupsNames;
        })
        .catch(error => {
            this.loading = false;
            console.error("Could not load groups names!", error);
        });
    }

    groupNameChanged() {
        this.nameNotAvailable = this.groupsNames.indexOf(this.groupName) !== -1;
    }

    okClicked() {
        this.dialogRef.close(this.groupName);
    }

}
