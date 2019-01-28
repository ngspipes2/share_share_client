import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface UploadToolsDialogData {
    uploads : UploadData[];
}

export interface UploadData {
    repositoryName: string;
    toolName: string;
    promise : Promise<any>
}

@Component({
  selector: 'app-upload-tools-dialog',
  templateUrl: './upload-tools-dialog.component.html',
  styleUrls: ['./upload-tools-dialog.component.scss']
})
export class UploadToolsDialogComponent {

    uploads : any[];
    closable: boolean;



    constructor(public dialogRef: MatDialogRef<UploadToolsDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: UploadToolsDialogData) {
        this.uploads = data.uploads.map(upload => {
            let data = {
                repositoryName: upload.repositoryName,
                toolName: upload.toolName,
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
