import { Component, Input } from '@angular/core';

import { RepositoryConfig } from '../../../../../entities/repository-config';
import { OperationsManager } from '../../../../operations.manager';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

    @Input()
    config : RepositoryConfig;

    @Input()
    selected : boolean;

    deleting : boolean;



    constructor(private operationsMenager : OperationsManager) { }



    deleteClick(event : any) {
        event.stopPropagation();

        this.deleting = true;

        this.operationsMenager.deleteRepositoryConfig(this.config)
        .then(() => this.deleting = false)
        .catch(() => this.deleting = false);;
    }

}
