import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { RepositoryConfig } from '../../../entities/repository-config';
import { RepositoryConfigService } from '../../../services/repository-config.service';
import { ToolsRepositoryFacadeService } from '../../../services/tools-repository-facade.service';

export interface SelectToolsFromRepositoryDialogData {
    repositoryName: string;
}

@Component({
    selector: 'app-select-tools-from-repository-dialog',
    templateUrl: './select-tools-from-repository-dialog.component.html',
    styleUrls: ['./select-tools-from-repository-dialog.component.scss']
})
export class SelectToolsFromRepositoryDialogComponent implements OnInit, OnDestroy {

    toolsSubscription : any;
    configSubscription : any;

    repositoryName : string;
    config : RepositoryConfig;
    toolsNames : string[] = [];
    tools : any[];



    constructor(public dialogRef: MatDialogRef<SelectToolsFromRepositoryDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: SelectToolsFromRepositoryDialogData,
                private repositoryConfigService : RepositoryConfigService,
                private toolsRepositoryFacadeService : ToolsRepositoryFacadeService) {
        this.repositoryName = data.repositoryName;
    }



    ngOnInit() {
        this.toolsSubscription = this.toolsRepositoryFacadeService.toolEvent.subscribe((id) => {
            if(id[0] === this.repositoryName)
                this.load();
        });

        this.configSubscription = this.repositoryConfigService.configEvent.subscribe(repositoryName => {
            if(this.repositoryName === repositoryName)
                this.load();
        })

        this.load();
    }

    ngOnDestroy() {
        this.configSubscription.unsubscribe();
        this.toolsSubscription.unsubscribe();
    }

    load() : Promise<any> {
        this.tools = undefined;

        return this.loadConfig()
        .then(config => {
            if(config)
                return this.loadToolsNames()
                .then(() => this.buildTools());
        });
    }

    loadConfig() : Promise<RepositoryConfig> {
        return this.repositoryConfigService.getConfig(this.repositoryName)
        .then(config => {
            if(config)
                this.config = config;
            else
                this.dialogRef.close({
                    result: null,
                    error: "There is no config to access Repository: " + this.repositoryName + "!"
                });

             return config;
        })
        .catch(error => {
            this.dialogRef.close({
                result: null,
                error: "Error getting config for Repository: " + this.repositoryName + "!" + error
            });
            throw error;
        });
    }

    loadToolsNames() : Promise<string[]> {
        return this.toolsRepositoryFacadeService.getToolsNames(this.config)
        .then(names => {
            this.toolsNames = names;
            return names;
        })
        .catch(error => {
            this.dialogRef.close({
                rsult: null,
                error: "Error getting Tools names of Repository: " + this.repositoryName + "! " + error
            });
            throw error;
        });
    }

    buildTools() {
        this.tools = [];

        this.toolsNames.forEach(toolName => this.tools.push({
            selected: false,
            name: toolName
        }));
    }

    selectClicked() {
        let selectedTools = this.tools.filter(tool => tool.selected).map(tool => tool.name);
        this.dialogRef.close({
            result: selectedTools,
            error: null
        });
    }

}
