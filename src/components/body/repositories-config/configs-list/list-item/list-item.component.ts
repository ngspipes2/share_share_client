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



    constructor(private operationsMenager : OperationsManager) { }



    deleteClick(event : any) : Promise<any> {
        event.stopPropagation();
        return this.operationsMenager.deleteRepositoryConfig(this.config);
    }

}
