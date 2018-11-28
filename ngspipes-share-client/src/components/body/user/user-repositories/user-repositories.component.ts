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

    creating : boolean;
    publishing : boolean;



    constructor(private operationsManager : OperationsManager) { }



    publishRepositoryClick() {
        this.publishing = true;

        let repository = new Repository(null, null, null, null, null, false, null, null);

        this.operationsManager.publishRepository(repository)
        .then(() => this.publishing = false)
        .catch(() => this.publishing = false);
    }

    createRepositoryClick() {
        this.creating = true;

        let repository = new Repository(null, null, null, null, null, false, null, null);

        this.operationsManager.createRepository(repository)
        .then(() => this.creating = false)
        .catch(() => this.creating = false);
    }

}
