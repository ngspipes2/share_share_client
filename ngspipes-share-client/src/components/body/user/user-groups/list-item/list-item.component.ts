import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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
    deleting : boolean;



    constructor(private router : Router,
                private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.isOwner = this.group.ownerName === this.userName;
        this.isMember = this.group.ownerName !== this.userName;
    }

    deleteClick(event : any) {
        event.stopPropagation();

        this.deleting = true;

        this.operationsManager.deleteGroup(this.group)
        .then(() => this.deleting = false)
        .catch(() => this.deleting = false);
    }

    elementClick() {
        this.router.navigate(["/groups/" + this.group.groupName]);
    }

}
