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

    deleting : boolean;



    constructor(private operationsManager : OperationsManager) { }



    deleteClick() {
        this.deleting = true;

        let repository = new Repository(this.repositoryName, null, null, null, null, false, null, null);

        this.operationsManager.deleteRepository(repository)
        .then(() => this.deleting = false)
        .catch(() => this.deleting = false);
    }

}
