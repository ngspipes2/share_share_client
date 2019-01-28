import { Component } from '@angular/core';

import { OperationsManager } from '../../../operations.manager';

@Component({
    selector: 'app-logout-option',
    templateUrl: './logout-option.component.html',
    styleUrls: ['./logout-option.component.scss']
})
export class LogoutOptionComponent {

    constructor(private operationsManager : OperationsManager) { }



    logoutClick() {
        this.operationsManager.logout();
    }

}
