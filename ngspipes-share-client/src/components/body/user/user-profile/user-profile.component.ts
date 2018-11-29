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



    constructor(private operationsManager : OperationsManager,
                private sessionService : SessionService,
                private router : Router,
                private dialogManager : DialogManager) { }



    deleteClick() : Promise<any> {
        let user = new User(this.userName, null, null, null, null, null);

        return this.operationsManager.deleteUser(user)
        .then((result) => {
            if(result) {
                if(this.sessionService.getCurrentCredentials()[0] === this.userName)
                    this.logout();
            }

            return result;
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
