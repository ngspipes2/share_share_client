import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export enum Type {
    ERROR = "ERROR",
    WARNING = "WARNING",
    INFO = "INFO",
    SUCCESS = "SUCCESS"
}

export interface SimpleDialogData {
    title: string;
    message: string;
    type: Type;
    responses: string[];
}

@Component({
    selector: 'app-simple-dialog',
    templateUrl: './simple-dialog.component.html',
    styleUrls: ['./simple-dialog.component.scss']
})
export class SimpleDialogComponent {

    title : string;
    message : string;
    type : Type;
    responses : string[];



    constructor(public dialogRef: MatDialogRef<SimpleDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: SimpleDialogData) {
        this.title = data.title;
        this.message = data.message;
        this.type = data.type;
        this.responses = data.responses;
    }



    getIcon() {
        if(this.type === Type.ERROR)
            return 'error';

        if(this.type === Type.WARNING)
            return 'warning';

        if(this.type === Type.INFO)
            return 'info';

        if(this.type === Type.SUCCESS)
            return 'check_circle';
    }

}
