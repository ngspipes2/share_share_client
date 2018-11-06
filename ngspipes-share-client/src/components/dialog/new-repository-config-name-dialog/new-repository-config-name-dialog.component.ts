import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { RepositoryConfigService } from '../../../services/repository-config.service';

@Component({
    selector: 'app-new-repository-config-name-dialog',
    templateUrl: './new-repository-config-name-dialog.component.html',
    styleUrls: ['./new-repository-config-name-dialog.component.scss']
})
export class NewRepositoryConfigNameDialogComponent implements OnInit {

    configSubscription : any;
    names : string[] = [];

    loading : boolean;
    name : string;
    isValidName : boolean = false;
    invalidMessage : string;



    constructor(private dialogRef: MatDialogRef<NewRepositoryConfigNameDialogComponent>,
                private repositoryConfigService : RepositoryConfigService) { }



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
            console.error("Could not get repositories configs!", error);
        });
    }

    nameChanged() {
        if(!this.name || this.name.length < 0) {
            this.isValidName = false;
            this.invalidMessage = undefined;
        } else if(this.names.indexOf(this.name) !== -1) {
            this.isValidName = false;
            this.invalidMessage = "You already have a configuration with this name!";
        } else {
            this.isValidName = true;
            this.invalidMessage = undefined;
        }
    }

    okClicked() {
        this.dialogRef.close(this.name);
    }

}
