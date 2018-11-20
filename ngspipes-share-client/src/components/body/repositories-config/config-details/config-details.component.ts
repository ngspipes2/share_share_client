import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { RepositoryConfig } from '../../../../entities/repository-config';
import { RepositoryConfigService } from '../../../../services/repository-config.service';
import { DialogManager } from '../../../dialog/dialog.manager';

@Component({
    selector: 'app-config-details',
    templateUrl: './config-details.component.html',
    styleUrls: ['./config-details.component.scss']
})
export class ConfigDetailsComponent implements OnInit, OnDestroy, OnChanges {

    @Input()
    configName : string;

    configSubscription : any;

    config : RepositoryConfig;
    loading : boolean;
    saving : boolean;
    deleting : boolean;



    constructor(private repositoryConfigService : RepositoryConfigService,
                private dialogManager : DialogManager) { }



    ngOnInit() {
        this.configSubscription = this.repositoryConfigService.configEvent.subscribe(() => {
            if(this.configName)
                this.load()
        });

        if(this.configName)
            this.load();
    }

    ngOnChanges() {
        if(this.configName)
            this.load();
    }

    ngOnDestroy() {
        this.configSubscription.unsubscribe();
    }

    load() {
        this.loading = true;

        this.repositoryConfigService.getConfig(this.configName)
        .then(config => {
            this.loading = false;
            this.config = config;
        })
        .catch(error => {
            this.loading = false;
            this.dialogManager.openErrorDialog("Error getting Repository Config!", error);
            console.error(error);
        });
    }

    saveClick() {
        this.saving = true;

        this.repositoryConfigService.updateConfig(this.config)
        .then(result => {
            this.saving = false;
            if(!result)
                this.dialogManager.openErrorDialog("Repository Config could not be saved!", "Repository Config could not be saved! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Repository Config saved successfully!", "");
        })
        .catch(error => {
            this.saving = false;
            this.dialogManager.openErrorDialog("Error saving Repository Config!", error);
            console.error(error);
        });
    }

    deleteClick() {
        let title = "Delete Repository Config";
        let message = "Are you sure you wnat to delete Repository Config: " + this.configName + " ?";
        let options = ["Yes", "No"];
        this.dialogManager.openWarningDialog(title, message, options).afterClosed().subscribe(response => {
            if(response === "Yes")
                this.deleteConfig();
        });
    }

    deleteConfig() {
        this.deleting = true;

        this.repositoryConfigService.deleteConfig(this.configName)
        .then(result => {
            this.deleting = false;
            if(!result)
                this.dialogManager.openErrorDialog("Repository Config could not be deleted!", "Repository Config could not be deleted! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Repository Config deleted successfully!", "");
        })
        .catch(error => {
            this.deleting = false;
            this.dialogManager.openErrorDialog("Error deleting Repository Config!", error);
            console.error(error);
        });
    }

}
