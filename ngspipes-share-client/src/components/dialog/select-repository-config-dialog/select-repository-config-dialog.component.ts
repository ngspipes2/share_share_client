import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { RepositoryConfigService } from '../../../services/repository-config.service';

@Component({
    selector: 'app-select-repository-config-dialog',
    templateUrl: './select-repository-config-dialog.component.html',
    styleUrls: ['./select-repository-config-dialog.component.scss']
})
export class SelectRepositoryConfigDialogComponent implements OnInit, OnDestroy {

    configSubscription : any;

    repositoriesNames : string[];
    loading : boolean;
    selectedRepositoryName : string;



    constructor(private repositoryConfigService : RepositoryConfigService,
                private dialogRef : MatDialogRef<SelectRepositoryConfigDialogComponent>) { }



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
            this.repositoriesNames = configs.map(config => config.repositoryName);
        })
        .catch(error => {
            this.loading = false;
            this.dialogRef.close({
                result: null,
                error: "Error getting Repositories Configs! " + error
            });
        });
    }

    okClick() {
        this.dialogRef.close({
            result: this.selectedRepositoryName,
            error: null
        });
    }

}
