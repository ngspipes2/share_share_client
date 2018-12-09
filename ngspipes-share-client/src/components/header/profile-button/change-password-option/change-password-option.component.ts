import { Component } from '@angular/core';

import { SessionService } from '../../../../services/session.service';
import { OperationsManager } from '../../../operations.manager';

@Component({
    selector: 'app-change-password-option',
    templateUrl: './change-password-option.component.html',
    styleUrls: ['./change-password-option.component.scss']
})
export class ChangePasswordOptionComponent {

    constructor(private operationsManager : OperationsManager,
                private sessionService : SessionService) { }



    changePasswordClick() {
        let currentUserName = this.sessionService.getCurrentCredentials()[0];
        this.operationsManager.changeUserPassword(currentUserName, null, null);
    }

}
