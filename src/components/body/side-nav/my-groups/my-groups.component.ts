import { Component } from '@angular/core';

import { Group } from '../../../../entities/group';
import { OperationsManager } from '../../../operations.manager';

@Component({
    selector: 'app-my-groups',
    templateUrl: './my-groups.component.html',
    styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent {

    constructor(private operationsManager : OperationsManager) { }



    createGroupClick(event : any) : Promise<any> {
        event.stopPropagation();

        let group = new Group(null, null, null, null);

        return this.operationsManager.createGroup(group);
    }

}
