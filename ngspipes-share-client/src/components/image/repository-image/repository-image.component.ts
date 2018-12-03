import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Repository, EntityType, LocationType  } from '../../../entities/repository';
import { RepositoryService } from '../../../services/repository.service';
import { RepositoryConfig } from '../../../entities/repository-config';
import { RepositoryConfigService } from '../../../services/repository-config.service';
import { ToolsRepositoryFacadeService } from '../../../services/tools-repository-facade.service';
import { PipelinesRepositoryFacadeService } from '../../../services/pipelines-repository-facade.service';

import { LoadImageComponent } from '../load-image/load-image.component';

@Component({
  selector: 'app-repository-image',
  templateUrl: './repository-image.component.html',
  styleUrls: ['./repository-image.component.scss']
})
export class RepositoryImageComponent implements OnInit, OnDestroy {

    @ViewChild("loadImage")
    loadImage : LoadImageComponent;

    @Input()
    repositoryName : string;
    @Input()
    spinnerDiameter : number = 100;
    @Input()
    spinnerColor : string = "accent";

    repositorySubscription : any;
    configSubscription : any;

    repository : Repository;
    repositoryConfig : RepositoryConfig;



    constructor(private repositoryService : RepositoryService,
                private repositoryConfigService : RepositoryConfigService,
                private toolsRepositoryFacadeService : ToolsRepositoryFacadeService,
                private pipelinesRepositoryFacadeService : PipelinesRepositoryFacadeService) {}



    ngOnInit() {
        this.repositorySubscription = this.repositoryService.repositoryEvent.subscribe((repositoryName) => {
            if(!this.repository)
                this.loadImage.update();
            else if(this.repository.repositoryName === repositoryName)
                this.loadImage.update();
        });

        this.configSubscription = this.repositoryConfigService.configEvent.subscribe((configRepositoryName) => {
            if(!this.repositoryConfig)
                this.loadImage.update();
            else if(this.repositoryConfig.repositoryName === configRepositoryName)
                this.loadImage.update();
        });
    }

    ngOnDestroy() {
        this.repositorySubscription.unsubscribe();
        this.configSubscription.unsubscribe();
    }

    getRepository() : Promise<Repository> {
        return this.repositoryService.getRepository(this.repositoryName)
        .then(repository => {
            this.repository = repository;
            return repository;
        });
    }

    getRepositoryConfig() : Promise<RepositoryConfig> {
        return this.repositoryConfigService.getConfig(this.repositoryName)
        .then(config => {
            this.repositoryConfig = config ? config : undefined;
            return this.repositoryConfig;
        });
    }

    getImage() : Promise<any> {
        return this.getRepository()
        .then((repository) => {
            if(!repository)
                return null;

            return this.getRepositoryConfig()
            .then((config) => {
                if(!config)
                    return null;

                if(repository.entityType === EntityType.PIPELINES)
                    return this.pipelinesRepositoryFacadeService.getRepositoryImage(config);
                else
                    return this.toolsRepositoryFacadeService.getRepositoryImage(config);
            });
        });
    }

    getIcon() : string {
        return this.repository.entityType === EntityType.PIPELINES ? "insert_drive_file" : "build";
    }

}
