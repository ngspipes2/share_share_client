import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Repository, EntityType, LocationType } from '../../../../../entities/repository';
import { OperationsManager } from '../../../../operations.manager';
import { DialogManager } from '../../../../dialog/dialog.manager';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

    @Input()
    userName : string;
    @Input()
    repository : Repository;
    @Input()
    editable : boolean;

    isOwner : boolean;
    isMember : boolean;
    isToolsRepository : boolean;
    isPipelinesRepository : boolean;
    deleting : boolean;



    constructor(private router : Router,
                private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.isOwner = this.repository.ownerName === this.userName;
        this.isMember = this.repository.ownerName !== this.userName;
        this.isToolsRepository = this.repository.entityType === EntityType.TOOLS;
        this.isPipelinesRepository = this.repository.entityType === EntityType.PIPELINES;
    }

    deleteClick(event : any) {
        event.stopPropagation();

        this.deleting = true;

        this.operationsManager.deleteRepository(this.repository)
        .then(() => this.deleting = false)
        .catch(() => this.deleting = false);
    }

    elementClick() {
        this.router.navigate(["/repositories/" + this.repository.repositoryName]);
    }

}
