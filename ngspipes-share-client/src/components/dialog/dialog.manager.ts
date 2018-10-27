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

    public openErrorDialog(title : string, message : string) : MatDialogRef<SimpleDialogComponent, SimpleDialogData> {
        return this.openSimpleDialog(title, message, Type.ERROR, ["Ok"]);
    }

    public openWarningDialog(title : string, message : string) : MatDialogRef<SimpleDialogComponent, SimpleDialogData> {
        return this.openSimpleDialog(title, message, Type.WARNING, ["Ok"]);
    }

    public openInformationDialog(title : string, message : string) : MatDialogRef<SimpleDialogComponent, SimpleDialogData> {
        return this.openSimpleDialog(title, message, Type.INFO, ["Ok"]);
    }

    public openSuccessDialog(title : string, message : string) : MatDialogRef<SimpleDialogComponent, SimpleDialogData> {
        return this.openSimpleDialog(title, message, Type.SUCCESS, ["Ok"]);
    }

}
