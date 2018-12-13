import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { RepositoryConfig } from '../../../entities/repository-config';
import { RepositoryConfigService } from '../../../services/repository-config.service';
import { PipelinesRepositoryFacadeService } from '../../../services/pipelines-repository-facade.service';

import { SimpleDialogComponent, SimpleDialogData, Type } from '../simple-dialog/simple-dialog.component';

export interface SelectPipelinesFromRepositoryDialogData {
    repositoryName: string;
}

@Component({
    selector: 'app-select-pipelines-from-repository-dialog',
    templateUrl: './select-pipelines-from-repository-dialog.component.html',
    styleUrls: ['./select-pipelines-from-repository-dialog.component.scss']
})
export class SelectPipelinesFromRepositoryDialogComponent implements OnInit, OnDestroy {

    pipelinesSubscription : any;
    configSubscription : any;

    repositoryName : string;
    config : RepositoryConfig;
    pipelinesNames : string[] = [];
    pipelines : any[];



    constructor(public dialogRef: MatDialogRef<SelectPipelinesFromRepositoryDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: SelectPipelinesFromRepositoryDialogData,
                private repositoryConfigService : RepositoryConfigService,
                private pipelinesRepositoryFacadeService : PipelinesRepositoryFacadeService) {
        this.repositoryName = data.repositoryName;
    }



    ngOnInit() {
        this.pipelinesSubscription = this.pipelinesRepositoryFacadeService.pipelineEvent.subscribe((id) => {
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
        this.pipelinesSubscription.unsubscribe();
    }

    load() : Promise<any> {
        this.pipelines = undefined;

        return this.loadConfig()
        .then(config => {
            if(config)
                return this.loadPipelinesNames()
                .then(() => this.buildPipelines());
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

    loadPipelinesNames() : Promise<string[]> {
        return this.pipelinesRepositoryFacadeService.getPipelinesNames(this.config)
        .then(names => {
            this.pipelinesNames = names;
            return names;
        })
        .catch(error => {
            this.dialogRef.close({
                rsult: null,
                error: "Error getting Pipelines names of Repository: " + this.repositoryName + "! " + error
            });
            throw error;
        });
    }

    buildPipelines() {
        this.pipelines = [];

        this.pipelinesNames.forEach(pipelineName => this.pipelines.push({
            selected: false,
            name: pipelineName
        }));
    }

    selectClicked() {
        let selectedPipelines = this.pipelines.filter(pipeline => pipeline.selected).map(pipeline => pipeline.name);
        this.dialogRef.close({
            result: selectedPipelines,
            error: null
        });
    }

}
