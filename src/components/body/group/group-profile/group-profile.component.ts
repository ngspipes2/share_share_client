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



    constructor(private operationsManager : OperationsManager) { }



    deleteClick() : Promise<any> {
        let group = new Group(this.groupName, null, null, null);

        return this.operationsManager.deleteGroup(group);
    }

}
