import { Component } from '@angular/core';

import { Repository, EntityType, LocationType } from '../../../../entities/repository';
import { OperationsManager } from '../../../operations.manager';

@Component({
    selector: 'app-my-pipelines-repositories',
    templateUrl: './my-pipelines-repositories.component.html',
    styleUrls: ['./my-pipelines-repositories.component.scss']
})
export class MyPipelinesRepositoriesComponent {

    constructor(private operationsManager : OperationsManager) { }



    publishRepositoryClick(event : any) : Promise<any> {
        event.stopPropagation();

        let repository = new Repository(name, EntityType.PIPELINES, null, null, null, false, null, null);

        return this.operationsManager.publishRepository(repository);
    }

    createRepositoryClick(envet : any) : Promise<any> {
        event.stopPropagation();

        let repository = new Repository(name, EntityType.PIPELINES, null, null, null, false, null, null);

        return this.operationsManager.createRepository(repository);
    }

}
