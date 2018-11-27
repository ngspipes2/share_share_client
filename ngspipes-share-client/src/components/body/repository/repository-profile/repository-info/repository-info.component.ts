import { Component, Input } from '@angular/core';

import { Repository, EntityType, LocationType } from '../../../../../entities/repository';
import { RepositoryService } from '../../../../../services/repository.service';
import { RepositoryConfigService } from '../../../../../services/repository-config.service';
import { ToolsRepositoryFacadeService } from '../../../../../services/tools-repository-facade.service';
import { PipelinesRepositoryFacadeService } from '../../../../../services/pipelines-repository-facade.service';

import { DialogManager } from '../../../../dialog/dialog.manager';

@Component({
    selector: 'app-repository-info',
    templateUrl: './repository-info.component.html',
    styleUrls: ['./repository-info.component.scss']
})
export class RepositoryInfoComponent {

    @Input()
    repositoryName : string;
    @Input()
    editable : boolean;

    repositorySubscription : any;

    repository : Repository;
    loading : boolean;
    saving : boolean;
    changingImage : boolean;



    constructor(private dialogManager : DialogManager,
                private repositoryService : RepositoryService,
                private repositoryConfigService : RepositoryConfigService,
                private toolsRepositoryFacadeService : ToolsRepositoryFacadeService,
                private pipelinesRepositoryFacadeService : PipelinesRepositoryFacadeService) { }



    ngOnInit() {
        this.repositorySubscription = this.repositoryService.repositoryEvent.subscribe(() => this.load());
        this.load();
    }

    ngOnDestroy() {
        this.repositorySubscription.unsubscribe();
    }

    ngOnChanges() {
        this.load();
    }

    load() {
        this.loading = true;

        this.repositoryService.getRepository(this.repositoryName)
        .then(repository => {
            this.loading = false;
            this.repository = repository;
        })
        .catch(error => {
            this.loading = false;
            this.dialogManager.openErrorDialog("Error getting repository!", error);
            console.error(error);
        });
    }

    changeImage(file : any) {
        if(!file)
            return;

        this.changingImage = true;

        this.repositoryConfigService.getConfigsForLocation(this.repository.location)
        .then(configs => {
            if(configs.length === 0)
                this.dialogManager.openWarningDialog("No config found!", "You have no configs to access this repository!");
            else
                if(this.repository.entityType === EntityType.TOOLS)
                    this.toolsRepositoryFacadeService.setRepositoryImage(configs[0], file)
                    .then(result => {
                        this.changingImage = false;

                        if(result)
                            this.dialogManager.openSuccessDialog("Image uploaded successfully!", "");
                        else
                            this.dialogManager.openWarningDialog("Error uploading image!", "Image could not be uploaded try again later.");
                    })
                    .catch(error => {
                        this.changingImage = false;
                        this.dialogManager.openErrorDialog("Error uploading image!", error);
                        console.error(error);
                    });
                else
                    this.pipelinesRepositoryFacadeService.setRepositoryImage(configs[0], file)
                    .then(result => {
                        this.changingImage = false;

                        if(result)
                            this.dialogManager.openSuccessDialog("Image uploaded successfully!", "");
                        else
                            this.dialogManager.openWarningDialog("Error uploading image!", "Image could not be uploaded try again later.");
                    })
                    .catch(error => {
                        this.changingImage = false;
                        this.dialogManager.openErrorDialog("Error uploading image!", error);
                        console.error(error);
                    });
        })
        .catch(error => {
            this.changingImage = false;
            this.dialogManager.openErrorDialog("Error gettings configs for current repository!", error);
            console.error(error);
        });
    }

    saveClick() {
        this.saving = true;

        this.repositoryService.updateRepository(this.repository)
        .then(result => {
            this.saving = false;

            if(!result)
                this.dialogManager.openErrorDialog("Repository could not be saved!", "Repository could not be saved! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Saved successfully", null);
        })
        .catch(error => {
            this.saving = false;
            this.dialogManager.openErrorDialog("Error saving repository!", error);
            console.error(error);
        });
    }

    getDateFieldLabel() {
        if(!this.repository || this.repository.locationType === LocationType.INTERNAL)
            return "Creation Date";

        return "Publication Date";
    }

    getOwnerFieldLabel() {
        if(!this.repository || this.repository.locationType === LocationType.INTERNAL)
            return "Owner";

        return "Publisher";
    }

    getType() {
        if(!this.repository)
            return "";

        if(this.repository.locationType === LocationType.EXTERNAL)
            return this.repository.entityType === EntityType.TOOLS ? "External Tools Repository" : "External Pipelines Repository";
        else
            return this.repository.entityType === EntityType.TOOLS ? "Internal Tools Repository" : "Internal Pipelines Repository";
    }

    showPublicFieldWarning() {
        return this.repository && this.repository.locationType === LocationType.EXTERNAL && this.editable;
    }

}
