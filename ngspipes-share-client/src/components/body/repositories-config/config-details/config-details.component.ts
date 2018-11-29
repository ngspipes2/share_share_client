import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { RepositoryConfig } from '../../../../entities/repository-config';
import { RepositoryConfigService } from '../../../../services/repository-config.service';
import { DialogManager } from '../../../dialog/dialog.manager';
import { OperationsManager } from '../../../operations.manager';

@Component({
    selector: 'app-config-details',
    templateUrl: './config-details.component.html',
    styleUrls: ['./config-details.component.scss']
})
export class ConfigDetailsComponent implements OnInit, OnDestroy, OnChanges {

    @Input()
    configName : string;

    configSubscription : any;

    config : RepositoryConfig;
    loading : boolean;



    constructor(private repositoryConfigService : RepositoryConfigService,
                private dialogManager : DialogManager,
                private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.configSubscription = this.repositoryConfigService.configEvent.subscribe(() => {
            if(this.configName)
                this.load()
        });

        if(this.configName)
            this.load();
    }

    ngOnChanges() {
        if(this.configName)
            this.load();
    }

    ngOnDestroy() {
        this.configSubscription.unsubscribe();
    }

    load() {
        this.loading = true;

        this.repositoryConfigService.getConfig(this.configName)
        .then(config => {
            this.loading = false;
            this.config = config;
        })
        .catch(error => {
            this.loading = false;
            this.dialogManager.openErrorDialog("Error getting Repository Config!", error);
            console.error(error);
        });
    }

    saveClick() : Promise<any> {
        return this.operationsManager.saveRepositoryConfig(this.config);
    }

    deleteClick() : Promise<any> {
        return this.operationsManager.deleteRepositoryConfig(this.config);
    }

}
