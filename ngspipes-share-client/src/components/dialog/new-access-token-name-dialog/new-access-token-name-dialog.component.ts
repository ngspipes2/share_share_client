import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-new-access-token-name-dialog',
    templateUrl: './new-access-token-name-dialog.component.html',
    styleUrls: ['./new-access-token-name-dialog.component.scss']
})
export class NewAccessTokenNameDialogComponent {

    name : string;



    constructor(private dialogRef: MatDialogRef<NewAccessTokenNameDialogComponent>) { }



    okClicked() {
        this.dialogRef.close({result: null, error: null});
    }
}
