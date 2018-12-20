import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';

import { Repository, LocationType, EntityType } from '../../../../../entities/repository';
import { RepositoryConfig } from '../../../../../entities/repository-config';

import { Tool } from '../../../../../entities/tool';
import { ToolsRepositoryFacadeService } from '../../../../../services/tools-repository-facade.service';
import { Pipeline } from '../../../../../entities/pipeline';
import { PipelinesRepositoryFacadeService } from '../../../../../services/pipelines-repository-facade.service';

import { OperationsManager } from '../../../../operations.manager';
import { Filter, TextFilter, IconFilter } from '../../../../utils/filter-list/filter-list.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    repositoryName : string;
    @Input()
    editable : boolean;

    toolSubscription : any;
    pipelineSubscription : any;

    repository : Repository;
    config : RepositoryConfig;

    toolsNames : string[];
    pipelinesNames : string[];
    entitiesNames : string[];

    filters: Filter[] = [];



    constructor(private toolsRepositoryFacadeService : ToolsRepositoryFacadeService,
                private pipelinesRepositoryFacadeService : PipelinesRepositoryFacadeService,
                private operationsManager : OperationsManager) {
        this.filters = [
            new TextFilter(this.acceptName.bind(this), "", "Name")
        ];
    }



    ngOnInit() {
        this.toolSubscription = this.toolsRepositoryFacadeService.toolEvent.subscribe(id => {
            if(id[0] === this.repositoryName)
                 this.load();
        });

        this.pipelineSubscription = this.pipelinesRepositoryFacadeService.pipelineEvent.subscribe(id => {
            if(id[0] === this.repositoryName)
                this.load();
        });

        this.load();
    }

    ngOnChanges() {
        this.load();
    }

    ngOnDestroy() {
        this.toolSubscription.unsubscribe();
        this.pipelineSubscription.unsubscribe();
    }

    load() {
        this.entitiesNames = undefined;

        this.loadRepository()
        .then(() => this.loadContent());

        this.loadRepositoryConfig()
        .then(() => this.loadContent());
    }

    loadRepository() : Promise<Repository> {
        return this.operationsManager.getRepository(this.repositoryName)
        .then(repository => this.repository = repository);
    }

    loadRepositoryConfig() : Promise<RepositoryConfig> {
        return this.operationsManager.getRepositoryConfig(this.repositoryName)
        .then(config => this.config = config);
    }

    loadContent() {
        if(!this.config || !this.repository)
            return;

        if(this.repository.entityType === EntityType.TOOLS)
            this.loadTools();
        else
            this.loadPipelines();
    }

    loadTools() {
        this.operationsManager.getToolsNames(this.repository)
        .then(toolsNames => {
            this.toolsNames = toolsNames;
            this.entitiesNames = toolsNames;
        });
    }

    loadPipelines() {
        this.operationsManager.getPipelinesNames(this.repository)
        .then(pipelinesNames => {
            this.pipelinesNames = pipelinesNames;
            this.entitiesNames = pipelinesNames;
        });
    }

    acceptName(entityName : string, text : string) {
        let name = entityName.toLowerCase();
        text = text.toLowerCase();

        return name.indexOf(text) !== -1;
    }

    isToolsRepository() : boolean {
        return this.repository && this.repository.entityType == EntityType.TOOLS;
    }

    isPipelinesRepository() : boolean {
        return this.repository && this.repository.entityType == EntityType.PIPELINES;
    }

    getEntityType() : string {
        if(!this.repository)
            return "";

        return this.repository.entityType === EntityType.TOOLS ? "Tool" : "Pipeline";
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
            let tool = new Tool("","","","",[],[],[],[]);
            return this.operationsManager.createTool(this.repository, tool);
        } else {
            let pipeline = new Pipeline("","","","",[],[],[],[],[],[]);
            return this.operationsManager.createPipeline(this.repository, pipeline);
        }
    }

}
