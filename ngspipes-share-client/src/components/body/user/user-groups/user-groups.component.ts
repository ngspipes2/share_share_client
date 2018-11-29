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



    constructor(private operationsManager : OperationsManager) { }



    createGroupClick() : Promise<string> {
        let group = new Group(null, null, null, null);
        return this.operationsManager.createGroup(group);
    }

}
