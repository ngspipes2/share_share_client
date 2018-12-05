import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface NewToolNameDialogData {
    repositoryName: string;
}

@Component({
    selector: 'app-new-tool-name-dialog',
    templateUrl: './new-tool-name-dialog.component.html',
    styleUrls: ['./new-tool-name-dialog.component.scss']
})
export class NewToolNameDialogComponent {

    repositoryName : string;
    toolName : string;



    constructor(public dialogRef: MatDialogRef<NewToolNameDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: NewToolNameDialogData) {
        this.repositoryName = data.repositoryName;
    }



    okClicked() {
        this.dialogRef.close(this.toolName);
    }

}
