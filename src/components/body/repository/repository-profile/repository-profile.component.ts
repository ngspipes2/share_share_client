import { Component, Input } from '@angular/core';

import { Repository } from '../../../../entities/repository';
import { OperationsManager } from '../../../operations.manager';

@Component({
    selector: 'app-repository-profile',
    templateUrl: './repository-profile.component.html',
    styleUrls: ['./repository-profile.component.scss']
})
export class RepositoryProfileComponent {

    @Input()
    repositoryName : string;
    @Input()
    editable : boolean;



    constructor(private operationsManager : OperationsManager) { }



    deleteClick() : Promise<any> {
       let repository = new Repository(this.repositoryName, null, null, null, null, false, null, null);
        return this.operationsManager.deleteRepository(repository);
    }

}
