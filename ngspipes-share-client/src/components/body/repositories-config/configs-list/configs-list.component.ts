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



    constructor(private operationsManager : OperationsManager) { }



    createConfigClick() : Promise<any> {
        let config = new RepositoryConfig(null, "", "", []);

        return this.operationsManager.createRepositoryConfig(config)
        .then((result) => {
            this.selectConfig(config.name);
            return result;
        });
    }

    selectConfig(name : string) {
        this.selectedConfigName = name;
        this.selectedConfigNameChange.emit(name);
    }

}
