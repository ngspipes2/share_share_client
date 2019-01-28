import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface ClonePipelinesDialogData {
    clones : CloneData[];
}

export interface CloneData {
    repositoryName: string;
    pipelineName: string;
    promise : Promise<any>
}

@Component({
    selector: 'app-clone-pipelines-dialog',
    templateUrl: './clone-pipelines-dialog.component.html',
    styleUrls: ['./clone-pipelines-dialog.component.scss']
})
export class ClonePipelinesDialogComponent {

    clones : any[];
    closable: boolean;



    constructor(public dialogRef: MatDialogRef<ClonePipelinesDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: ClonePipelinesDialogData) {
        this.clones = data.clones.map(clone => {
            let data = {
                repositoryName: clone.repositoryName,
                pipelineName: clone.pipelineName,
                finished: false,
                error: null
            };

            clone.promise
            .then(() => {
                data.finished = true;
                this.checkClosable();
            })
            .catch(error => {
                data.finished = true;
                data.error = error;
                this.checkClosable();
            });

            return data;
        });

        this.disableClose();
    }

    checkClosable() {
        if(this.clones.every(clone => clone.finished))
            this.ableClose();
    }

    disableClose() {
        this.closable = false;
        this.dialogRef.disableClose = true;
    }

    ableClose() {
        this.closable = true;
        this.dialogRef.disableClose = false;
    }

    okClicked() {
        this.dialogRef.close();
    }

}
