import { Component, Input } from '@angular/core';

import { Repository, EntityType, LocationType } from '../../../../entities/repository';
import { OperationsManager } from '../../../operations.manager';

@Component({
    selector: 'app-user-repositories',
    templateUrl: './user-repositories.component.html',
    styleUrls: ['./user-repositories.component.scss']
})
export class UserRepositoriesComponent {

    @Input()
    userName : string;
    @Input()
    editable : boolean;



    constructor(private operationsManager : OperationsManager) { }



    publishRepositoryClick() : Promise<any> {
        let repository = new Repository(null, null, null, null, null, false, null, null);
        return this.operationsManager.publishRepository(repository);
    }

    createRepositoryClick() : Promise<any> {
        let repository = new Repository(null, null, null, null, null, false, null, null);
        return this.operationsManager.createRepository(repository);
    }

}
