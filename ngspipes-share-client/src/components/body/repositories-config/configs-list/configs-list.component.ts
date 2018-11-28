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
    selectedConfigNameChange : EventEmitter<string> = new EventEmitter<string>();

    selectedConfigName : string;

    creating : boolean;



    constructor(private operationsManager : OperationsManager) { }



    createConfigClick() {
        this.creating = true;

        let config = new RepositoryConfig(null, "", "", []);

        this.operationsManager.createRepositoryConfig(config)
        .then((result) => {
            this.creating = false;
            this.selectConfig(config.name);
        })
        .catch(() => this.creating = false);
    }

    selectConfig(name : string) {
        this.selectedConfigName = name;
        this.selectedConfigNameChange.emit(name);
    }

}
