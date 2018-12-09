import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { RepositoryConfig } from '../../../../entities/repository-config';
import { RepositoryConfigService } from '../../../../services/repository-config.service';

import { OperationsManager } from '../../../operations.manager';

@Component({
    selector: 'app-config-details',
    templateUrl: './config-details.component.html',
    styleUrls: ['./config-details.component.scss']
})
export class ConfigDetailsComponent implements OnInit, OnDestroy, OnChanges {

    @Input()
    configRepositoryName : string;

    configSubscription : any;

    config : RepositoryConfig;
    loading : boolean;



    constructor(private repositoryConfigService : RepositoryConfigService,
                private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.configSubscription = this.repositoryConfigService.configEvent.subscribe(() => {
            if(this.configRepositoryName)
                this.load()
        });

        if(this.configRepositoryName)
            this.load();
    }

    ngOnChanges() {
        if(this.configRepositoryName)
            this.load();
    }

    ngOnDestroy() {
        this.configSubscription.unsubscribe();
    }

    load() {
        this.loading = true;

        this.operationsManager.getRepositoryConfig(this.configRepositoryName)
        .then(config => {
            this.loading = false;
            this.config = config;
        })
        .catch(error => this.loading = false);
    }

    saveClick() : Promise<any> {
        return this.operationsManager.saveRepositoryConfig(this.config);
    }

    deleteClick() : Promise<any> {
        return this.operationsManager.deleteRepositoryConfig(this.config);
    }

}
