import { Component, Input } from '@angular/core';

import { RepositoryConfig, Config } from '../../../../../entities/repository-config';
import { RepositoryConfigService } from '../../../../../services/repository-config.service';

import { DialogManager } from '../../../../dialog/dialog.manager';
import { OperationsManager } from '../../../../operations.manager';

@Component({
    selector: 'app-config-info',
    templateUrl: './config-info.component.html',
    styleUrls: ['./config-info.component.scss']
})
export class ConfigInfoComponent {

    @Input()
    config : RepositoryConfig;

    cloning : boolean;



    constructor(private repositoryConfigService : RepositoryConfigService,
                private operationsManager : OperationsManager,
                private dialogManager : DialogManager) { }



    addConfigClick() {
        let config = new Config("", "", false);
        this.config.configs.push(config);
    }

    removeConfigClick(config : Config) {
        this.config.configs = this.config.configs.filter(c => c !== config);
    }

    cloneConfigClick() {
        this.dialogManager.openSelectRepositoryConfigDialogAsPromise()
        .then(result => {
            if(result)
                this.cloneConfig(result);
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error selecting Repository!", error);
        });
    }

    cloneConfig(repositoryName : string) {
        this.cloning = true;

        this.operationsManager.getRepositoryConfig(repositoryName)
        .then(config => {
            this.cloning = false;
            this.config.configs = config.configs;
        })
        .catch(error => this.cloning = false);
    }
}
