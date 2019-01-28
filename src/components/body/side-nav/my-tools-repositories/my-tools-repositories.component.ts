import { Component } from '@angular/core';

import { Repository, EntityType, LocationType } from '../../../../entities/repository';
import { OperationsManager } from '../../../operations.manager';

@Component({
  selector: 'app-my-tools-repositories',
  templateUrl: './my-tools-repositories.component.html',
  styleUrls: ['./my-tools-repositories.component.scss']
})
export class MyToolsRepositoriesComponent {

    constructor(private operationsManager : OperationsManager) { }



    publishRepositoryClick(event : any) : Promise<any> {
        event.stopPropagation();

        let repository = new Repository(name, EntityType.TOOLS, null, null, null, false, null, null);

        return this.operationsManager.publishRepository(repository);
    }

    createRepositoryClick(event : any) : Promise<any> {
        event.stopPropagation();

        let repository = new Repository(name, EntityType.TOOLS, null, null, null, false, null, null);

        return this.operationsManager.createRepository(repository);
    }

}
