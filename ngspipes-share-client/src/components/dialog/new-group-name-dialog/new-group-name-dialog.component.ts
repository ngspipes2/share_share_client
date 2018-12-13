import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';

import { GroupService } from '../../../services/group.service';

@Component({
    selector: 'app-new-group-name-dialog',
    templateUrl: './new-group-name-dialog.component.html',
    styleUrls: ['./new-group-name-dialog.component.scss']
})
export class NewGroupNameDialogComponent implements OnInit, OnDestroy {

    validCharactersRegex : RegExp = new RegExp(/[a-zA-Z0-9\-_]+$/);
    groupSubscription : any;
    groupsNames : string[] = [];

    groupName : string;
    validGroupName : boolean = false;
    invalidMessage : string;
    loadEvent : Subject<any> = new Subject();



    constructor(private dialogRef: MatDialogRef<NewGroupNameDialogComponent>,
                private groupService : GroupService) { }



    ngOnInit() {
        this.groupSubscription = this.groupService.groupEvent.subscribe(() => this.loadEvent.next());
        setTimeout(() => this.loadEvent.next());
    }

    ngOnDestroy() {
        this.groupSubscription.unsubscribe();
    }

    load() : Promise<any> {
        return this.groupService.getGroupsNames()
        .then(groupsNames => this.groupsNames = groupsNames)
        .catch(error => {
            this.dialogRef.close({
                result: null,
                error: "Error getting Groups names! " + error
            });
        });
    }

    groupNameChanged() {
        if(!this.groupName || this.groupName.length < 1) {
            this.validGroupName = false;
            this.invalidMessage = undefined;
        } else if(this.groupsNames.indexOf(this.groupName) !== -1) {
            this.validGroupName = false;
            this.invalidMessage = "GroupName not available!";
        } else if(!this.validCharactersRegex.test(this.groupName) || new RegExp(/\s/).test(this.groupName)) {
            this.validGroupName = false;
            this.invalidMessage = "Invalid characters!";
        } else {
            this.validGroupName = true;
            this.invalidMessage = undefined;
        }
    }

    okClicked() {
        this.dialogRef.close({
            result: this.groupName,
            error: null
        });
    }

}
