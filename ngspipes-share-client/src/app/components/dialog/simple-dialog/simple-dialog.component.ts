import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface SimpleDialogData {
    title: string;
    message: string;
    type: string;
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
    type : string;
    responses : string[];



    constructor(public dialogRef: MatDialogRef<SimpleDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: SimpleDialogData) {
        this.title = data.title;
        this.message = data.message;
        this.type = data.type;
        this.responses = data.responses;
    }


    getIcon() {
        if(this.type === 'ERROR')
            return 'error';

        if(this.type === 'WARNING')
            return 'warning';

        if(this.type === 'INFORMATION')
            return 'info';

        if(this.type === 'SUCCESS')
            return 'check_circle';
    }

}
