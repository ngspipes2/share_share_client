import { Component, OnInit, OnDestroy, EventEmitter,Input, Output } from '@angular/core';

import { RepositoryConfig } from '../../../../../entities/repository-config';
import { RepositoryConfigService } from '../../../../../services/repository-config.service';
import { DialogManager } from '../../../../dialog/dialog.manager';
import { Filter, TextFilter, IconFilter } from '../../../../utils/filter-list/filter-list.component';
import { OperationsManager } from '../../../../operations.manager';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

    @Output()
    selectedConfigNameChange : EventEmitter<string> = new EventEmitter<string>();
    @Input()
    selectedConfigName : string;

    configSubscription : any;

    configs : RepositoryConfig[] = [];
    loading : boolean;
    creating : boolean;

    filters : Filter[];



    constructor(private repositoryConfigService : RepositoryConfigService,
                private dialogManager : DialogManager,
                private operationsManager : OperationsManager) {
        this.filters = [
            new TextFilter(this.acceptName.bind(this), "", "ConfigName")
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

        this.repositoryConfigService.getAllConfigs()
        .then(configs => {
            this.loading = false;

            this.configs = configs.sort((a,b) => {
                if (a.name < b.name)
                    return -1;
                if (a.name > b.name)
                    return 1;

                return 0;
            });
        })
        .catch(error => {
            this.loading = false;
            this.dialogManager.openErrorDialog("Error getting Repositories Config!", error);
            console.error(error);
        });
    }

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

    configClick(config : RepositoryConfig) {
        this.selectConfig(config.name);
    }

    selectConfig(name : string) {
        this.selectedConfigName = name;
        this.selectedConfigNameChange.emit(name);
    }

    isSelected(config : RepositoryConfig) {
        return this.selectedConfigName === config.name;
    }

    acceptName(config : RepositoryConfig, text : string) {
        let name = config.name.toLowerCase();
        text = text.toLowerCase();

        return name.indexOf(text) !== -1;
    }

}
