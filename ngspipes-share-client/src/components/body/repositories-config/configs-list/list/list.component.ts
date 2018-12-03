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
    selectedConfigRepositoryNameChange : EventEmitter<string> = new EventEmitter<string>();
    @Input()
    selectedConfigRepositoryName : string;

    configSubscription : any;

    configs : RepositoryConfig[] = [];
    loading : boolean;

    filters : Filter[];



    constructor(private repositoryConfigService : RepositoryConfigService,
                private dialogManager : DialogManager,
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

        this.repositoryConfigService.getAllConfigs()
        .then(configs => {
            this.loading = false;

            this.configs = configs.sort((a,b) => {
                if (a.repositoryName < b.repositoryName)
                    return -1;
                if (a.repositoryName > b.repositoryName)
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
