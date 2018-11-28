import { Component } from '@angular/core';

import { Repository, EntityType, LocationType } from '../../../../entities/repository';
import { OperationsManager } from '../../../operations.manager';

@Component({
    selector: 'app-my-pipelines-repositories',
    templateUrl: './my-pipelines-repositories.component.html',
    styleUrls: ['./my-pipelines-repositories.component.scss']
})
export class MyPipelinesRepositoriesComponent {

    publishing : boolean;
    creating : boolean;



    constructor(private operationsManager : OperationsManager) { }



    publishRepositoryClick(event : any) {
        event.stopPropagation();

        this.publishing = true;

        let repository = new Repository(name, EntityType.PIPELINES, null, null, null, false, null, null);

        this.operationsManager.publishRepository(repository)
        .then(() => this.publishing = false)
        .catch(() => this.publishing = false);
    }

    createRepositoryClick(envet : any) {
        event.stopPropagation();

        this.creating = true;

        let repository = new Repository(name, EntityType.PIPELINES, null, null, null, false, null, null);

        this.operationsManager.createRepository(repository)
        .then(() => this.creating = false)
        .catch(() => this.creating = false);
    }

}
