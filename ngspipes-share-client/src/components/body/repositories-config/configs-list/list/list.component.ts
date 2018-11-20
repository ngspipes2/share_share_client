import { Component, OnInit, OnDestroy, EventEmitter,Input, Output } from '@angular/core';

import { RepositoryConfig } from '../../../../../entities/repository-config';
import { RepositoryConfigService } from '../../../../../services/repository-config.service';
import { DialogManager } from '../../../../dialog/dialog.manager';

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
    filterText : string = "";



    constructor(private repositoryConfigService : RepositoryConfigService,
                private dialogManager : DialogManager) { }



    ngOnInit() {
        this.configSubscription = this.repositoryConfigService.configEvent.subscribe(() => this.load());
        this.load();
    }

    ngOnDestroy() {
        this.configSubscription.unsubscribe();
    }

    load() {
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
        this.dialogManager.openNewRepositoryConfigNameDialog().afterClosed().subscribe(name => {
            if(!name)
                return;

           this.createConfig(name);
        });
    }

    createConfig(name : string) {
        let config = new RepositoryConfig(name, "", "", []);

        this.creating = true;

        this.repositoryConfigService.createConfig(config)
        .then(result => {
            this.creating = false;

            if(!result)
                this.dialogManager.openErrorDialog("Repository Config not created!", "Repository Config could not be created! Please try again latter.");
            else
                this.selectConfig(name);
        })
        .catch(error => {
            this.creating = false;
            this.dialogManager.openErrorDialog("Error creating Repository Config!", error);
            console.error(error);
        });
    }

    configClick(config : RepositoryConfig) {
        this.selectConfig(config.name);
    }

    selectConfig(name : string) {
        this.selectedConfigName = name;
        this.selectedConfigNameChange.emit(name);
    }

    filter(config : RepositoryConfig) {
        let filter = this.filterText.toLowerCase();
        let name = config.name.toLowerCase();

        return name.indexOf(filter) !== -1;
    }

    isSelected(config : RepositoryConfig) {
        return this.selectedConfigName === config.name;
    }

}
