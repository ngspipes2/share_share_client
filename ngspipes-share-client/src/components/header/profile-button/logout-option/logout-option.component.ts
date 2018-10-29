import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../../../../services/session.service';
import { DialogManager } from '../../../dialog/dialog.manager';

@Component({
    selector: 'app-logout-option',
    templateUrl: './logout-option.component.html',
    styleUrls: ['./logout-option.component.scss']
})
export class LogoutOptionComponent {

    constructor(private router : Router,
                private sessionService : SessionService,
                private dialogManager : DialogManager) { }



    logoutClick() {
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
