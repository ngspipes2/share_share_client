import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { UserService } from '../../../logic/services/user.service';

@Component({
    selector: 'app-select-user-dialog',
    templateUrl: './select-user-dialog.component.html',
    styleUrls: ['./select-user-dialog.component.scss']
})
export class SelectUserDialogComponent implements OnInit {

    names : string[];
    namesAux : string[];
    userName : "";



    constructor(private userService : UserService,
                public dialogRef: MatDialogRef<SelectUserDialogComponent>) { }



    ngOnInit() {
        this.userService.getUsersNames()
        .then((names) => {
            this.namesAux = names;
            this.names = this.namesAux.filter((name) => name.indexOf(this.userName? this.userName : "") !== -1);
        })
        .catch((error) => console.error(error));
    }

    select(name : string) {
        this.dialogRef.close(name);
    }

    inputChanged() {
        this.names = this.namesAux.filter((name) => name.indexOf(this.userName? this.userName : "") !== -1);
    }

}
