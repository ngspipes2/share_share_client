import { Component, OnInit, OnDestroy, EventEmitter,Input, Output } from '@angular/core';

import { RepositoryConfig } from '../../../../../entities/repository-config';
import { RepositoryConfigService } from '../../../../../services/repository-config.service';

import { Filter, TextFilter, IconFilter } from '../../../../utils/filter-list/filter-list.component';
import { OperationsManager } from '../../../../operations.manager';

import { Utils } from '../../../../utils/utils';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

    @Output()
    selectedConfigRepositoryNameChange : EventEmitter<string> = new EventEmitter<string>();
    @Input()
    selectedConfigRepositoryName : string;

    configSubscription : any;

    configs : RepositoryConfig[] = [];
    loading : boolean;

    filters : Filter[];



    constructor(private repositoryConfigService : RepositoryConfigService,
                private operationsManager : OperationsManager) {
        this.filters = [
            new TextFilter(this.acceptName.bind(this), "", "RepositoryName")
        ];
    }



    ngOnInit() {
        this.configSubscription = this.repositoryConfigService.configEvent.subscribe(() => this.load());
        this.load();
    }

    ngOnDestroy() {
        this.configSubscription.unsubscribe();
    }

    load() {
        this.configs = undefined;
        this.loading = true;

        this.operationsManager.getAllRepositoriesConfigs()
        .then(configs => {
            this.loading = false;
            this.configs = Utils.sort(configs, config => config.repositoryName);
        })
        .catch(error => this.loading = false);
    }

    createConfigClick() : Promise<any> {
        let config = new RepositoryConfig(null, "", []);

        return this.operationsManager.createRepositoryConfig(config)
        .then((result) => {
            this.selectConfig(config.repositoryName);
            return result;
        });
    }

    configClick(config : RepositoryConfig) {
        this.selectConfig(config.repositoryName);
    }

    selectConfig(repositoryName : string) {
        this.selectedConfigRepositoryName = repositoryName;
        this.selectedConfigRepositoryNameChange.emit(repositoryName);
    }

    isSelected(config : RepositoryConfig) {
        return this.selectedConfigRepositoryName === config.repositoryName;
    }

    acceptName(config : RepositoryConfig, text : string) {
        let name = config.repositoryName.toLowerCase();
        text = text.toLowerCase();

        return name.indexOf(text) !== -1;
    }

}
