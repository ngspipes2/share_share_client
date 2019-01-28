import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Repository, LocationType, EntityType } from '../../../../entities/repository';
import { RepositoryConfig } from '../../../../entities/repository-config';

import { Tool } from '../../../../entities/tool';
import { Pipeline } from '../../../../entities/pipeline';

import { OperationsManager } from '../../../operations.manager';
import { RepositoryConfigService } from '../../../../services/repository-config.service';

@Component({
    selector: 'app-repository-content',
    templateUrl: './repository-content.component.html',
    styleUrls: ['./repository-content.component.scss']
})
export class RepositoryContentComponent implements OnInit, OnChanges {

    @Input()
    repositoryName : string;

    repository : Repository;
    config : RepositoryConfig;
    editable : boolean;



    constructor(private operationsManager : OperationsManager,
                private repositoryConfigService : RepositoryConfigService,
                private router : Router) { }



    ngOnInit() {
        this.load();
    }

    ngOnChanges(changes : SimpleChanges) {
        if(changes.repositoryName && changes.repositoryName.currentValue !== changes.repositoryName.previousValue)
            this.load();
    }

    load() {
        this.loadRepository()
        .then(() => this.loadConfig()
            .then(() => this.checkEditable()));
    }

    loadRepository() : Promise<Repository> {
        this.repository = undefined;

        return this.operationsManager.getRepository(this.repositoryName)
        .then(repository => this.repository = repository);
    }

    loadConfig() : Promise<RepositoryConfig> {
        this.config = undefined;

        return this.repositoryConfigService.getConfig(this.repositoryName)
        .then(config => this.config = config);
    }

    checkEditable() {
        this.editable = this.config !== null && this.config !== undefined;
    }

    getHeaderTitle() : string {
        if(!this.repository)
            return "";

        return this.repository.entityType === EntityType.TOOLS ? "Tools" : "Pipelines";
    }

    getEntityType() : string {
        if(!this.repository)
            return "";

        return this.repository.entityType === EntityType.TOOLS ? "Tool" : "Pipeline";
    }

    downloadClick() : Promise<any> {
        if(this.repository.entityType === EntityType.TOOLS)
            return this.operationsManager.downloadToolsRepository(this.repositoryName);
        else
            return this.operationsManager.downloadPipelinesRepository(this.repositoryName);
    }

    cloneClick() : Promise<any> {
        if(this.repository.entityType === EntityType.TOOLS)
            return this.operationsManager.cloneTools(null, this.repositoryName);
        else
            return this.operationsManager.clonePipelines(null, this.repositoryName);
    }

    uploadClick(file : any) : Promise<any> {
        if(this.repository.entityType === EntityType.TOOLS)
            return this.operationsManager.uploadToolsRepository(file, this.repositoryName);
        else
            return this.operationsManager.uploadPipelinesRepository(file, this.repositoryName);
    }

    createClick() : Promise<any> {
        if(this.repository.entityType === EntityType.TOOLS) {
            let tool = new Tool("","","","",[],[],[],null);
            return this.operationsManager.createTool(this.repository, tool);
        } else {
            let pipeline = new Pipeline("","","","",[],null,[],[],[],[]);
            return this.operationsManager.createPipeline(this.repository, pipeline);
        }
    }

    goToRepositoryConfigPageClick() {
        this.router.navigate(['/repositoriesconfig']);
    }

}
