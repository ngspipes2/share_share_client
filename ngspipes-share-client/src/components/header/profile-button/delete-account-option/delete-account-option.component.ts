import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../../../services/user.service';
import { SessionService } from '../../../../services/session.service';
import { DialogManager } from '../../../dialog/dialog.manager';

@Component({
    selector: 'app-delete-account-option',
    templateUrl: './delete-account-option.component.html',
    styleUrls: ['./delete-account-option.component.scss']
})
export class DeleteAccountOptionComponent {

    constructor(private router : Router,
                private userService : UserService,
                private sessionService : SessionService,
                private dialogManager : DialogManager) { }



    deleteAccountClick() {
        this.dialogManager.openWarningDialog(
            "Delete Account",
            "Are you sure you want to delete this account?",
            ["Yes", "No"]
        ).afterClosed().subscribe(response => {
            if(response === "Yes")
                this.deleteAccount();
        });
    }

    deleteAccount() {
        let userName = this.sessionService.getCurrentCredentials()[0];
        this.userService.deleteUser(userName)
        .then(result => {
            if(result)
                this.logout();
            else
                this.dialogManager.openErrorDialog("Account could not be deleted!", "This account could not be deleted! Please try again later.");
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error deleting account!", error);
            console.error(error);
        });
    }

    logout() {
        this.sessionService.logout()
        .then((response) => {
            if(response)
                this.router.navigate(['/login']);
            else
                this.dialogManager.openWarningDialog("Could not logout!", null);
        })
        .catch((error) => {
            this.dialogManager.openErrorDialog("Error while logout!", error);
            console.error(error);
        });
    }

}
