import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { GroupService } from '../../../logic/services/group.service';

@Component({
    selector: 'app-select-group-dialog',
    templateUrl: './select-group-dialog.component.html',
    styleUrls: ['./select-group-dialog.component.scss']
})
export class SelectGroupDialogComponent implements OnInit {

    names : string[];
    namesAux : string[];
    groupName : "";



    constructor(private groupService : GroupService,
                public dialogRef: MatDialogRef<SelectGroupDialogComponent>) { }



    ngOnInit() {
        this.groupService.getGroupsNames()
        .then((names) => {
            this.namesAux = names;
            this.names = this.namesAux.filter((name) => name.indexOf(this.groupName? this.groupName : "") !== -1);
        })
        .catch((error) => console.error(error));
    }

    select(name : string) {
        this.dialogRef.close(name);
    }

    inputChanged() {
       this.names = this.namesAux.filter((name) => name.indexOf(this.groupName? this.groupName : "") !== -1);
    }

}
