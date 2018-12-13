import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';

import { RepositoryConfig } from '../../../entities/repository-config';
import { RepositoryConfigService } from '../../../services/repository-config.service';
import { PipelinesRepositoryFacadeService } from '../../../services/pipelines-repository-facade.service';

export interface NewPipelineNameDialogData {
    repositoryName: string;
}

@Component({
    selector: 'app-new-pipeline-name-dialog',
    templateUrl: './new-pipeline-name-dialog.component.html',
    styleUrls: ['./new-pipeline-name-dialog.component.scss']
})
export class NewPipelineNameDialogComponent implements OnInit, OnDestroy {

    validCharactersRegex : RegExp = new RegExp(/[a-zA-Z0-9\-_]+$/);
    repositorySubscription : any;
    configSubscription : any;
    pipelinesNames : string[] = [];

    repositoryName : string;
    config : RepositoryConfig;

    pipelineName : string;
    validName : boolean = false;
    invalidMessage : string;
    loadEvent : Subject<any> = new Subject();



    constructor(public dialogRef: MatDialogRef<NewPipelineNameDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: NewPipelineNameDialogData,
                private repositoryConfigService : RepositoryConfigService,
                private pipelinesRepositoryFacadeService : PipelinesRepositoryFacadeService) {
        this.repositoryName = data.repositoryName;
    }



    ngOnInit() {
        this.configSubscription = this.repositoryConfigService.configEvent.subscribe(repositoryName => {
            if(repositoryName === this.repositoryName)
                this.loadEvent.next();
        });

        this.repositorySubscription = this.pipelinesRepositoryFacadeService.pipelineEvent.subscribe(id => {
            if(id[0] === this.repositoryName)
                this.loadEvent.next();
        });

        setTimeout(() => this.loadEvent.next());
    }

    ngOnDestroy() {
        this.configSubscription.unsubscribe();
        this.repositorySubscription.unsubscribe();
    }

    load() : Promise<any> {
        return this.getRepositoryConfig()
        .then(config => {
            if(config)
                return this.getPipelinesNames();
        });
    }

    getRepositoryConfig() : Promise<RepositoryConfig> {
        return this.repositoryConfigService.getConfig(this.repositoryName)
        .then(config => {
            this.config = config;

            if(!config)
                this.dialogRef.close({
                    result: null,
                    error: "There is no Config for Repository: " + this.repositoryName + "!"
                });

            return config;
        })
        .catch(error => {
            this.dialogRef.close({
                result: null,
                error: "Error getting Config for Repository: " + this.repositoryName + "! " + error
            });

            throw error;
        });
    }

    getPipelinesNames() : Promise<string[]> {
        return this.pipelinesRepositoryFacadeService.getPipelinesNames(this.config)
        .then(names => {
            this.pipelinesNames = names;
            return names;
        })
        .catch(error => {
            this.dialogRef.close({
                result: null,
                error: "Error getting Pipelines names of Repository: " + this.repositoryName + "! " + error
            });
            throw error;
        });
    }

    pipelineNameChanged() {
        if(!this.pipelineName || this.pipelineName.length < 1) {
            this.validName = false;
            this.invalidMessage = undefined;
        } else if(this.pipelinesNames.indexOf(this.pipelineName) !== -1) {
            this.validName = false;
            this.invalidMessage = "Pipeline name not available!";
        } else if(!this.validCharactersRegex.test(this.pipelineName) || new RegExp(/\s/).test(this.pipelineName)) {
            this.validName = false;
            this.invalidMessage = "Invalid characters!";
        } else {
            this.validName = true;
            this.invalidMessage = undefined;
        }
    }

    okClicked() {
        this.dialogRef.close({
            result: this.pipelineName,
            error: null
        });
   }

}
