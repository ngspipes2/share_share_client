import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-change-password-dialog',
    templateUrl: './change-password-dialog.component.html',
    styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent {

    hideCurrentPassword : boolean = true;
    hideNewPassword : boolean = true;
    currentPassword : string;
    newPassword : string;



    constructor(public dialogRef: MatDialogRef<ChangePasswordDialogComponent>) { }



    changePasswordClick() {
        this.dialogRef.close({
            result: {
                currentPassword : this.currentPassword,
                newPassword : this.newPassword
            },
            error: null
        });
    }

}
