import { Component, Input, OnInit, OnDestroy, ElementRef } from '@angular/core';

import { Repository, EntityType, LocationType  } from '../../../entities/repository';
import { RepositoryService } from '../../../services/repository.service';
import { RepositoryConfig } from '../../../entities/repository-config';
import { RepositoryConfigService } from '../../../services/repository-config.service';
import { ToolsRepositoryFacadeService } from '../../../services/tools-repository-facade.service';
import { PipelinesRepositoryFacadeService } from '../../../services/pipelines-repository-facade.service';

@Component({
  selector: 'app-repository-image',
  templateUrl: './repository-image.component.html',
  styleUrls: ['./repository-image.component.scss']
})
export class RepositoryImageComponent implements OnInit, OnDestroy {

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
    imageData : any;

    loading : boolean;
    inited : boolean = false;
    observer: IntersectionObserver;



    constructor(private repositoryService : RepositoryService,
                private repositoryConfigService : RepositoryConfigService,
                private toolsRepositoryFacadeService : ToolsRepositoryFacadeService,
                private pipelinesRepositoryFacadeService : PipelinesRepositoryFacadeService,
                private element : ElementRef) {}



    ngOnInit() {
        this.observer = new IntersectionObserver(this.handleIntersect.bind(this));
        this.observer.observe(this.element.nativeElement);

        this.repositorySubscription = this.repositoryService.repositoryEvent.subscribe((repositoryName) => {
            if(!this.inited)
                return;

            if(!this.repository)
                this.load();
            else if(repositoryName === this.repositoryName)
                this.load();
        });

        this.configSubscription = this.repositoryConfigService.configEvent.subscribe((configName) => {
            if(!this.inited)
                return;

            if(!this.repositoryConfig)
                this.load();
            else if(this.repositoryConfig.name === configName)
                this.load();
        });
    }

    ngOnDestroy() {
        this.observer.disconnect();
        this.repositorySubscription.unsubscribe();
        this.configSubscription.unsubscribe();
    }

    handleIntersect(entries, observer) : void {
        entries.forEach((entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting && !this.inited) {
                this.inited = true;
                this.load();
            }
        });
    }

    load() {
        this.loadRepository()
        .then(() => {
            this.loadRepositoryConfig()
            .then(() => {
                if(this.repositoryConfig)
                    this.loadImage();
            })
        });
    }

    loadRepository() : Promise<Repository> {
        this.loading = true;

        return this.repositoryService.getRepository(this.repositoryName)
        .then(repository => {
            this.loading = false;
            this.repository = repository;
            return repository;
        })
        .catch(error => {
            this.loading = false;
            this.imageData = undefined;
            throw error;
        });
    }

    loadRepositoryConfig() : Promise<RepositoryConfig> {
        this.loading = true;

        return this.repositoryConfigService.getConfigsForLocation(this.repository.location)
        .then(configs => {
            this.loading = false;
            this.repositoryConfig = configs.length > 0 ? configs[0] : undefined;
            return configs[0];
        })
        .catch(error => {
            this.loading = false;
            this.imageData = undefined;
            throw error;
        });
    }

    loadImage() : Promise<any> {
        this.loading = true;

        let promise : Promise<any>;
        if(this.repository.entityType === EntityType.PIPELINES)
            promise = this.pipelinesRepositoryFacadeService.getRepositoryImage(this.repositoryConfig);
        else
            promise = this.toolsRepositoryFacadeService.getRepositoryImage(this.repositoryConfig)

        return promise.then(image => {
                this.loading = false;
                this.imageData = image;
                return image;
            })
            .catch(error => {
                this.loading = false;
                this.imageData = undefined;
                throw error;
            });
    }

    getIcon() : string {
        if(!this.repository)
            return "";

        return this.repository.entityType === EntityType.PIPELINES ? "insert_drive_file" : "build";
    }

}
