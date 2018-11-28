import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Group } from '../../../../entities/group';
import { OperationsManager } from '../../../operations.manager';

@Component({
    selector: 'app-my-groups',
    templateUrl: './my-groups.component.html',
    styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent {

    creating : boolean;



    constructor(private operationsManager : OperationsManager) { }



    createGroupClick(event : any) {
        event.stopPropagation();
        
        this.creating = true;

        let group = new Group(null, null, null, null);

        this.operationsManager.createGroup(group)
        .then(() => this.creating = false)
        .catch(() => this.creating = false);
    }

}
