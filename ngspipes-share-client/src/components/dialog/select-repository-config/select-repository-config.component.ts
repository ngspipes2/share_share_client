import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { RepositoryConfigService } from '../../../services/repository-config.service';

@Component({
    selector: 'app-select-repository-config',
    templateUrl: './select-repository-config.component.html',
    styleUrls: ['./select-repository-config.component.scss']
})
export class SelectRepositoryConfigComponent implements OnInit, OnDestroy {

    configSubscription : any;

    names : string[];
    loading : boolean;
    selectedName : string;



    constructor(private repositoryConfigService : RepositoryConfigService,
                private dialogRef : MatDialogRef<SelectRepositoryConfigComponent>) { }



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
            this.names = configs.map(config => config.name);
        })
        .catch(error => {
            this.loading = false;
            console.error(error);
        });
    }

    okClick() {
        this.dialogRef.close(this.selectedName);
    }

}
