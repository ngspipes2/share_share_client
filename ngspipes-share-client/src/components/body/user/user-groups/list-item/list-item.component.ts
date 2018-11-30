import { Component, Input } from '@angular/core';

import { Group } from '../../../../../entities/group';
import { OperationsManager } from '../../../../operations.manager';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

    @Input()
    userName : string;
    @Input()
    group : Group;
    @Input()
    editable : boolean;

    isOwner : boolean;
    isMember : boolean;



    constructor(private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.isOwner = this.group.ownerName === this.userName;
        this.isMember = this.group.ownerName !== this.userName;
    }

    deleteClick(event : any) : Promise<any> {
        event.stopPropagation();
        return this.operationsManager.deleteGroup(this.group);
    }

}
