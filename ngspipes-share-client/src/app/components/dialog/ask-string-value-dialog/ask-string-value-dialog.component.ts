import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface AskStringValueDialogData {
    message : string;
    placeholder : string;
}

@Component({
    selector: 'app-ask-string-value-dialog',
    templateUrl: './ask-string-value-dialog.component.html',
    styleUrls: ['./ask-string-value-dialog.component.scss']
})
export class AskStringValueDialogComponent {

    message : string;
    placeholder : string;



    constructor(public dialogRef: MatDialogRef<AskStringValueDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: AskStringValueDialogData) {
        this.message = data.message;
        this.placeholder = data.placeholder;
    }



    okClick(value : string) {
        this.dialogRef.close(value);
    }

}
