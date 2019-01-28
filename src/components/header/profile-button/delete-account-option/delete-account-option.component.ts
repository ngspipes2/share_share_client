import { Component } from '@angular/core';

import { User } from '../../../../entities/user';
import { SessionService } from '../../../../services/session.service';
import { OperationsManager } from '../../../operations.manager';

@Component({
    selector: 'app-delete-account-option',
    templateUrl: './delete-account-option.component.html',
    styleUrls: ['./delete-account-option.component.scss']
})
export class DeleteAccountOptionComponent {

    constructor(private sessionService : SessionService,
                private operationsManager : OperationsManager) { }



    deleteAccountClick() {
        let userName = this.sessionService.getCurrentCredentials()[0];
        let user = new User(userName, null, null, null, null, null);

        this.operationsManager.deleteUser(user)
        .then(result => {
            if(result)
                this.logout();
        });
    }

    logout() {
        this.operationsManager.logout();
    }

}
