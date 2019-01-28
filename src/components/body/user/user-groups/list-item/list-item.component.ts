import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { Group } from '../../../../../entities/group';
import { OperationsManager } from '../../../../operations.manager';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit, OnChanges {

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
        this.load();
    }

    ngOnChanges() {
        this.load();
    }

    load() {
        this.isOwner = this.group.ownerName === this.userName;
        this.isMember = this.group.ownerName !== this.userName;
    }

    deleteClick(event : any) : Promise<any> {
        event.stopPropagation();
        return this.operationsManager.deleteGroup(this.group);
    }

}
