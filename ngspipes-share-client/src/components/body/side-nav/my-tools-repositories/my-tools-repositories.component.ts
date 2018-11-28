import { Component } from '@angular/core';

import { Repository, EntityType, LocationType } from '../../../../entities/repository';
import { OperationsManager } from '../../../operations.manager';

@Component({
  selector: 'app-my-tools-repositories',
  templateUrl: './my-tools-repositories.component.html',
  styleUrls: ['./my-tools-repositories.component.scss']
})
export class MyToolsRepositoriesComponent {

    creating : boolean;
    publishing : boolean;



    constructor(private operationsManager : OperationsManager) { }



    publishRepositoryClick(event : any) {
        event.stopPropagation();
        
        this.publishing = true;

        let repository = new Repository(name, EntityType.TOOLS, null, null, null, false, null, null);

        this.operationsManager.publishRepository(repository)
        .then(() => this.publishing = false)
        .catch(() => this.publishing = false);
    }

    createRepositoryClick(event : any) {
        event.stopPropagation();

        this.creating = true;

        let repository = new Repository(name, EntityType.TOOLS, null, null, null, false, null, null);

        this.operationsManager.createRepository(repository)
        .then(() => this.creating = false)
        .catch(() => this.creating = false);
    }

}
