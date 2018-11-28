import { Component, Input } from '@angular/core';

import { Group } from '../../../../entities/group';
import { OperationsManager } from '../../../operations.manager';

@Component({
    selector: 'app-user-groups',
    templateUrl: './user-groups.component.html',
    styleUrls: ['./user-groups.component.scss']
})
export class UserGroupsComponent {

    @Input()
    userName : string;
    @Input()
    editable : boolean;

    creating : boolean;



    constructor(private operationsManager : OperationsManager) { }



    createGroupClick() {
        this.creating = true;

        let group = new Group(null, null, null, null);

        this.operationsManager.createGroup(group)
        .then(() => this.creating = false)
        .catch(() => this.creating = false);
    }

}
