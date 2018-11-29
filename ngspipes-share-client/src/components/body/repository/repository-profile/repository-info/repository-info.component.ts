import { Component, Input } from '@angular/core';

import { Repository, EntityType, LocationType } from '../../../../../entities/repository';
import { RepositoryService } from '../../../../../services/repository.service';
import { RepositoryConfigService } from '../../../../../services/repository-config.service';
import { ToolsRepositoryFacadeService } from '../../../../../services/tools-repository-facade.service';
import { PipelinesRepositoryFacadeService } from '../../../../../services/pipelines-repository-facade.service';
import { OperationsManager } from '../../../../operations.manager';
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



    constructor(private dialogManager : DialogManager,
                private repositoryService : RepositoryService,
                private repositoryConfigService : RepositoryConfigService,
                private toolsRepositoryFacadeService : ToolsRepositoryFacadeService,
                private pipelinesRepositoryFacadeService : PipelinesRepositoryFacadeService,
                private operationsManager : OperationsManager) { }



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

    changeImage(file : any) : Promise<any> {
        if(!file)
            return Promise.resolve(true);

        return this.operationsManager.changeRepositoryImage(this.repository, file);
    }

    saveClick() : Promise<any> {
        return this.operationsManager.saveRepository(this.repository);
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
