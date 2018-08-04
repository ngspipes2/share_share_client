import { Component, Input } from '@angular/core';

import { Group } from '../../../logic/domain/group';

@Component({
    selector: 'app-user-groups',
    templateUrl: './user-groups.component.html',
    styleUrls: ['./user-groups.component.scss']
})
export class UserGroupsComponent {

    @Input()
    groups : Group[];

    @Input()
    editable : boolean;



    constructor() { }

}
