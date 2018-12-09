import { Component, Input, OnInit } from '@angular/core';

import { Repository, EntityType, LocationType } from '../../../../../entities/repository';
import { OperationsManager } from '../../../../operations.manager';

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



    constructor(private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.isOwner = this.repository.ownerName === this.userName;
        this.isMember = this.repository.ownerName !== this.userName;
        this.isToolsRepository = this.repository.entityType === EntityType.TOOLS;
        this.isPipelinesRepository = this.repository.entityType === EntityType.PIPELINES;
    }

    deleteClick(event : any) : Promise<any> {
        event.stopPropagation();
        return this.operationsManager.deleteRepository(this.repository);
    }

}
