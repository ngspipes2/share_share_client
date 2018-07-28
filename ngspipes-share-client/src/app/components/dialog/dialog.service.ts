import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { SimpleDialogData, SimpleDialogComponent } from './simple-dialog/simple-dialog.component';

@Injectable()
export class DialogService {

    constructor(public dialog: MatDialog) {}



    openSimpleDialog(title : string, message : string, type : string, responses : string[]) : MatDialogRef<SimpleDialogComponent, SimpleDialogData> {
        const dialogRef = this.dialog.open(SimpleDialogComponent, {
            data: {title : title, message : message, type : type, responses : responses}
        });

        return dialogRef;
    }

    openErrorDialog(title : string, message : string) : MatDialogRef<SimpleDialogComponent, SimpleDialogData> {
        return this.openSimpleDialog(title, message, "ERROR", ["Ok"]);
    }

    openWarningDialog(title : string, message : string) : MatDialogRef<SimpleDialogComponent, SimpleDialogData> {
        return this.openSimpleDialog(title, message, "WARNING", ["Ok"]);
    }

    openInformationDialog(title : string, message : string) : MatDialogRef<SimpleDialogComponent, SimpleDialogData> {
        return this.openSimpleDialog(title, message, "INFORMATION", ["Ok"]);
    }

    openSuccessDialog(title : string, message : string) : MatDialogRef<SimpleDialogComponent, SimpleDialogData> {
        return this.openSimpleDialog(title, message, "SUCCESS", ["Ok"]);
    }

}
