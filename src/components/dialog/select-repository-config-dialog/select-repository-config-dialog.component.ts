import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';

import { RepositoryConfigService } from '../../../services/repository-config.service';

@Component({
    selector: 'app-select-repository-config-dialog',
    templateUrl: './select-repository-config-dialog.component.html',
    styleUrls: ['./select-repository-config-dialog.component.scss']
})
export class SelectRepositoryConfigDialogComponent implements OnInit, OnDestroy {

    configSubscription : any;

    repositoriesNames : string[];
    selectedRepositoryName : string;
    loadEvent : Subject<any> = new Subject();



    constructor(private repositoryConfigService : RepositoryConfigService,
                private dialogRef : MatDialogRef<SelectRepositoryConfigDialogComponent>) { }



    ngOnInit() {
        this.configSubscription = this.repositoryConfigService.configEvent.subscribe(() => this.loadEvent.next());
        setTimeout(() => this.loadEvent.next());
    }

    ngOnDestroy() {
        this.configSubscription.unsubscribe();
    }

    load() : Promise<any> {
        return this.repositoryConfigService.getAllConfigs()
        .then(configs => this.repositoriesNames = configs.map(config => config.repositoryName))
        .catch(error => {
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
