import { Component, Input } from '@angular/core';

import { Group } from '../../../../entities/group';
import { OperationsManager } from '../../../operations.manager';

@Component({
    selector: 'app-group-profile',
    templateUrl: './group-profile.component.html',
    styleUrls: ['./group-profile.component.scss']
})
export class GroupProfileComponent {

    @Input()
    groupName : string;
    @Input()
    editable : boolean;

    deleting : boolean;



    constructor(private operationsManager : OperationsManager) { }



    deleteClick() {
        this.deleting = true;

        let group = new Group(this.groupName, null, null, null);

        this.operationsManager.deleteGroup(group)
        .then(() => this.deleting = false)
        .catch(() => this.deleting = false);
    }

}
