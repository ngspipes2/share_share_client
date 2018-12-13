import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface CloneToolsDialogData {
    clones : CloneData[];
}

export interface CloneData {
    repositoryName: string;
    toolName: string;
    promise : Promise<any>
}

@Component({
    selector: 'app-clone-tools-dialog',
    templateUrl: './clone-tools-dialog.component.html',
    styleUrls: ['./clone-tools-dialog.component.scss']
})
export class CloneToolsDialogComponent {

    clones : any[];
    closable: boolean;



    constructor(public dialogRef: MatDialogRef<CloneToolsDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: CloneToolsDialogData) {
        this.clones = data.clones.map(clone => {
            let data = {
                repositoryName: clone.repositoryName,
                toolName: clone.toolName,
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
