import { Component, Output, EventEmitter } from '@angular/core';

import { RepositoryConfig } from '../../../../entities/repository-config';
import { RepositoryConfigService } from '../../../../services/repository-config.service';
import { DialogManager } from '../../../dialog/dialog.manager';
import { OperationsManager } from '../../../operations.manager';

@Component({
    selector: 'app-configs-list',
    templateUrl: './configs-list.component.html',
    styleUrls: ['./configs-list.component.scss']
})
export class ConfigsListComponent {

    @Output()
    selectedConfigRepositoryNameChange : EventEmitter<string> = new EventEmitter<string>();

    selectedConfigRepositoryName : string;



    constructor(private operationsManager : OperationsManager) { }



    createConfigClick() : Promise<any> {
        let config = new RepositoryConfig(null, "", []);

        return this.operationsManager.createRepositoryConfig(config)
        .then((result) => {
            this.selectConfig(config.repositoryName);
            return result;
        });
    }

    selectConfig(repositoryName : string) {
        this.selectedConfigRepositoryName = repositoryName;
        this.selectedConfigRepositoryNameChange.emit(repositoryName);
    }

}
