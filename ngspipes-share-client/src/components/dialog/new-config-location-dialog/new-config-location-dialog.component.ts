import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { RepositoryConfigService } from '../../../services/repository-config.service';

@Component({
    selector: 'app-new-config-location-dialog',
    templateUrl: './new-config-location-dialog.component.html',
    styleUrls: ['./new-config-location-dialog.component.scss']
})
export class NewConfigLocationDialogComponent implements OnInit {

    configSubscription : any;
    locations : string[] = [];

    loading : boolean;
    location : string;
    isValidLocation : boolean = false;
    invalidMessage : string;



    constructor(private dialogRef: MatDialogRef<NewConfigLocationDialogComponent>,
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
            this.locations = configs.map(config => config.location);
        })
        .catch(error => {
            this.loading = false;
            console.error("Could not get repositories configs!", error);
        });
    }

    locationChanged() {
        if(!this.location || this.location.length < 0) {
            this.isValidLocation = false;
            this.invalidMessage = undefined;
        } else if(this.locations.indexOf(this.location) !== -1) {
            this.isValidLocation = false;
            this.invalidMessage = "You already have a configuration for this repository location!";
        } else {
            this.isValidLocation = true;
            this.invalidMessage = undefined;
        }
    }

    okClicked() {
        this.dialogRef.close(this.location);
    }

}
