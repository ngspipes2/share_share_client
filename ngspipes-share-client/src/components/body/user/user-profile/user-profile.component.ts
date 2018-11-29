import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../../entities/user';
import { SessionService } from '../../../../services/session.service';
import { OperationsManager } from '../../../operations.manager';
import { DialogManager } from '../../../dialog/dialog.manager';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

    @Input()
    userName : string;
    @Input()
    editable : boolean;

    deleting : boolean;



    constructor(private operationsManager : OperationsManager,
                private sessionService : SessionService,
                private router : Router,
                private dialogManager : DialogManager) { }



    deleteClick() {
        this.deleting = true;

        let user = new User(this.userName, null, null, null, null, null);

        this.operationsManager.deleteUser(user)
        .then((result) => {
            this.deleting = false;

            if(result) {
                if(this.sessionService.getCurrentCredentials()[0] === this.userName)
                    this.logout();
            }
        })
        .catch(() => this.deleting = false);
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
