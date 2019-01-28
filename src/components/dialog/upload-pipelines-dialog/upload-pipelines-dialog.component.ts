import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface UploadPipelinesDialogData {
    uploads : UploadData[];
}

export interface UploadData {
    repositoryName: string;
    pipelineName: string;
    promise : Promise<any>
}

@Component({
  selector: 'app-upload-pipelines-dialog',
  templateUrl: './upload-pipelines-dialog.component.html',
  styleUrls: ['./upload-pipelines-dialog.component.scss']
})
export class UploadPipelinesDialogComponent {

    uploads : any[];
    closable: boolean;



    constructor(public dialogRef: MatDialogRef<UploadPipelinesDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: UploadPipelinesDialogData) {
        this.uploads = data.uploads.map(upload => {
            let data = {
                repositoryName: upload.repositoryName,
                pipelineName: upload.pipelineName,
                finished: false,
                error: null
            };

            upload.promise
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
        if(this.uploads.every(upload => upload.finished))
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
