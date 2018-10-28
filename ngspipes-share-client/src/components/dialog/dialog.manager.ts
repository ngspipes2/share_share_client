import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { ComponentType } from '@angular/cdk/portal';

import { Type,  SimpleDialogData, SimpleDialogComponent } from './simple-dialog/simple-dialog.component';

@Injectable()
export class DialogManager {

    constructor(public dialog: MatDialog) {}



     public open<T, D = any, R = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig<D>): MatDialogRef<T, R> {
         return this.dialog.open(componentOrTemplateRef, config);
     }

    public openSimpleDialog(title : string, message : string, type : Type, responses : string[]) : MatDialogRef<SimpleDialogComponent, SimpleDialogData> {
        return this.open(SimpleDialogComponent, {
            data: {title : title, message : message, type : type, responses : responses}
        });
    }

    public openErrorDialog(title : string, message : string, responses ? : string[]) : MatDialogRef<SimpleDialogComponent, SimpleDialogData> {
        if(!responses)
            responses = ["Ok"];

        return this.openSimpleDialog(title, message, Type.ERROR, responses);
    }

    public openWarningDialog(title : string, message : string, responses ? : string[]) : MatDialogRef<SimpleDialogComponent, SimpleDialogData> {
        if(!responses)
            responses = ["Ok"];

        return this.openSimpleDialog(title, message, Type.WARNING, responses);
    }

    public openInformationDialog(title : string, message : string, responses ? : string[]) : MatDialogRef<SimpleDialogComponent, SimpleDialogData> {
        if(!responses)
            responses = ["Ok"];

        return this.openSimpleDialog(title, message, Type.INFO, responses);
    }

    public openSuccessDialog(title : string, message : string, responses ? : string[]) : MatDialogRef<SimpleDialogComponent, SimpleDialogData> {
        if(!responses)
            responses = ["Ok"];

        return this.openSimpleDialog(title, message, Type.SUCCESS, responses);
    }

}
