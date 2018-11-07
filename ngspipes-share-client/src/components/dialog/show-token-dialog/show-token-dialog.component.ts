import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-show-token-dialog',
    templateUrl: './show-token-dialog.component.html',
    styleUrls: ['./show-token-dialog.component.scss']
})
export class ShowTokenDialogComponent {

    token : string;



    constructor(public dialogRef: MatDialogRef<ShowTokenDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: string) {
        this.token = data;
    }

}
