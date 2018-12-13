import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';

import { RepositoryConfig } from '../../../entities/repository-config';
import { RepositoryConfigService } from '../../../services/repository-config.service';
import { ToolsRepositoryFacadeService } from '../../../services/tools-repository-facade.service';

export interface NewToolNameDialogData {
    repositoryName: string;
}

@Component({
    selector: 'app-new-tool-name-dialog',
    templateUrl: './new-tool-name-dialog.component.html',
    styleUrls: ['./new-tool-name-dialog.component.scss']
})
export class NewToolNameDialogComponent implements OnInit, OnDestroy {

    validCharactersRegex : RegExp = new RegExp(/[a-zA-Z0-9\-_]+$/);
    repositorySubscription : any;
    configSubscription : any;
    toolsNames : string[] = [];

    repositoryName : string;
    config : RepositoryConfig;

    toolName : string;
    validName : boolean = false;
    invalidMessage : string;
    loadEvent : Subject<any> = new Subject();



    constructor(public dialogRef: MatDialogRef<NewToolNameDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: NewToolNameDialogData,
                private repositoryConfigService : RepositoryConfigService,
                private toolsRepositoryFacadeService : ToolsRepositoryFacadeService) {
        this.repositoryName = data.repositoryName;
    }



    ngOnInit() {
        this.configSubscription = this.repositoryConfigService.configEvent.subscribe(repositoryName => {
            if(repositoryName === this.repositoryName)
                this.loadEvent.next()
        });

        this.repositorySubscription = this.toolsRepositoryFacadeService.toolEvent.subscribe(id => {
            if(id[0] === this.repositoryName)
                this.loadEvent.next()
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
                return this.getToolsNames();
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

    getToolsNames() : Promise<string[]> {
        return this.toolsRepositoryFacadeService.getToolsNames(this.config)
        .then(names => {
            this.toolsNames = names;
            return names;
        })
        .catch(error => {
            this.dialogRef.close({
                result: null,
                error: "Error getting Tools names of Repository: " + this.repositoryName + "! " + error
            });
            throw error;
        });
    }

    toolNameChanged() {
        if(!this.toolName || this.toolName.length < 1) {
            this.validName = false;
            this.invalidMessage = undefined;
        } else if(this.toolsNames.indexOf(this.toolName) !== -1) {
            this.validName = false;
            this.invalidMessage = "Tool name not available!";
        } else if(!this.validCharactersRegex.test(this.toolName) || new RegExp(/\s/).test(this.toolName)) {
            this.validName = false;
            this.invalidMessage = "Invalid characters!";
        } else {
            this.validName = true;
            this.invalidMessage = undefined;
        }
    }

    okClicked() {
        this.dialogRef.close({
            result: this.toolName,
            error: null
        });
   }

}
