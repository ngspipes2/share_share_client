import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { Repository, LocationType, EntityType } from '../../../../entities/repository';
import { RepositoryConfig } from '../../../../entities/repository-config';

import { Tool } from '../../../../entities/tool';
import { Pipeline } from '../../../../entities/pipeline';

import { OperationsManager } from '../../../operations.manager';

@Component({
    selector: 'app-repository-content',
    templateUrl: './repository-content.component.html',
    styleUrls: ['./repository-content.component.scss']
})
export class RepositoryContentComponent implements OnInit, OnChanges {

    @Input()
    repositoryName : string;

    repository : Repository;
    editable : boolean;



    constructor(private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.load();
    }

    ngOnChanges() {
        this.load();
    }

    load() {
        this.loadRepository()
        .then(() => this.checkEditable());
    }

    loadRepository() : Promise<Repository> {
        return this.operationsManager.getRepository(this.repositoryName)
        .then(repository => this.repository = repository);
    }

    checkEditable() {
        this.editable = false;
        this.operationsManager.getRepositoryConfig(this.repositoryName)
        .then(config => this.editable = config != null);
    }

    getHeaderTitle() : string {
        if(!this.repository)
            return "";

        return this.repository.entityType === EntityType.TOOLS ? "Tools" : "Pipelines";
    }

    getEntityType() : string{
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

}
