import { Component, Input } from '@angular/core';

import { RepositoryConfig, Config } from '../../../../../entities/repository-config';
import { RepositoryConfigService } from '../../../../../services/repository-config.service';

import { DialogManager } from '../../../../dialog/dialog.manager';

@Component({
    selector: 'app-config-info',
    templateUrl: './config-info.component.html',
    styleUrls: ['./config-info.component.scss']
})
export class ConfigInfoComponent {

    @Input()
    config : RepositoryConfig;

    cloning : boolean;



    constructor(private dialogManager : DialogManager,
                private repositoryConfigService : RepositoryConfigService) { }



    addConfigClick() {
        let config = new Config("", "", false);
        this.config.configs.push(config);
    }

    removeConfigClick(config : Config) {
        this.config.configs = this.config.configs.filter(c => c !== config);
    }

    cloneConfigClick() {
        this.dialogManager.openSelectRepostiroyConfigDialog().afterClosed().subscribe(result => {
            if(result)
                this.cloneConfig(result);
        });
    }

    cloneConfig(configName : string) {
        this.cloning = true;

        this.repositoryConfigService.getConfig(configName)
        .then(config => {
            this.cloning = false;
            this.config.configs = config.configs;
        })
        .catch(error => {
            this.cloning = false;
            this.dialogManager.openErrorDialog("Error cloning Repository Config!", error);
            console.error(error);
        });
    }
}
