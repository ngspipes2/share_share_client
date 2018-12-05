import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface NewPipelineNameDialogData {
    repositoryName: string;
}

@Component({
    selector: 'app-new-pipeline-name-dialog',
    templateUrl: './new-pipeline-name-dialog.component.html',
    styleUrls: ['./new-pipeline-name-dialog.component.scss']
})
export class NewPipelineNameDialogComponent {

    repositoryName : string;
    pipelineName : string;



    constructor(public dialogRef: MatDialogRef<NewPipelineNameDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: NewPipelineNameDialogData) {
        this.repositoryName = data.repositoryName;
    }



    okClicked() {
        this.dialogRef.close(this.pipelineName);
    }

}
