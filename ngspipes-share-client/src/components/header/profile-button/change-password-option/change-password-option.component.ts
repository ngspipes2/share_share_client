import { Component } from '@angular/core';

import { DialogManager } from '../../../dialog/dialog.manager';
import { UserService } from '../../../../services/user.service';
import { SessionService } from '../../../../services/session.service';

@Component({
    selector: 'app-change-password-option',
    templateUrl: './change-password-option.component.html',
    styleUrls: ['./change-password-option.component.scss']
})
export class ChangePasswordOptionComponent {

    constructor(private dialogManager : DialogManager,
                private userService : UserService,
                private sessionService : SessionService) { }



    changePasswordClick() {
        this.dialogManager.openChangePasswordDialog().afterClosed().subscribe(passwords => {
            if(!passwords)
                return;

            let currentPassowrd = passwords.currentPassword;
            let newPassword = passwords.newPassword;
            let userName = this.sessionService.getCurrentCredentials()[0];

            this.userService.changeUserPassword(userName, currentPassowrd, newPassword)
            .then(result => {
                if(result)
                    this.dialogManager.openSuccessDialog("Password changed successfully!", null);
                else
                    this.dialogManager.openSuccessDialog("Password could not be changed!", "Password could not be changed! Please try again later.");
            })
            .catch(error => {
                this.dialogManager.openErrorDialog("Error changing password!", error);
                console.error(error);
            });
        });
    }

}
