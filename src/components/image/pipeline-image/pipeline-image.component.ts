import { Component, Input, OnInit, OnChanges,OnDestroy, ViewChild } from '@angular/core';

import { RepositoryConfig } from '../../../entities/repository-config';
import { RepositoryConfigService } from '../../../services/repository-config.service';
import { Pipeline } from '../../../entities/pipeline';
import { PipelinesRepositoryFacadeService } from '../../../services/pipelines-repository-facade.service';

import { LoadImageComponent } from '../load-image/load-image.component';

@Component({
    selector: 'app-pipeline-image',
    templateUrl: './pipeline-image.component.html',
    styleUrls: ['./pipeline-image.component.scss']
})
export class PipelineImageComponent implements OnInit, OnChanges, OnDestroy {

    @ViewChild("loadImage")
    loadImage : LoadImageComponent;

    @Input()
    repositoryName : string;
    @Input()
    pipelineName : string;
    @Input()
    spinnerDiameter : number = 100;
    @Input()
    spinnerColor : string = "accent";
    @Input()
    circular : boolean = true;

    configSubscription : any;
    pipelineSubscription : any;

    repositoryConfig : RepositoryConfig;
    pipeline : Pipeline;



    constructor(private repositoryConfigService : RepositoryConfigService,
                private pipelinesRepositoryFacadeService : PipelinesRepositoryFacadeService) {}



    ngOnInit() {
        this.configSubscription = this.repositoryConfigService.configEvent.subscribe((configRepositoryName) => {
            if(!this.repositoryConfig)
                this.loadImage.update();
            else if(this.repositoryConfig.repositoryName === configRepositoryName)
                this.loadImage.update();
        });

        this.pipelineSubscription = this.pipelinesRepositoryFacadeService.pipelineEvent.subscribe((id) => {
            if(id[0] === this.repositoryName && id[1] === this.pipelineName)
                this.loadImage.update();
        });
    }

    ngOnChanges() {
        this.loadImage.update();
    }

    ngOnDestroy() {
        this.configSubscription.unsubscribe();
        this.pipelineSubscription.unsubscribe();
    }

    getRepositoryConfig() : Promise<RepositoryConfig> {
        return this.repositoryConfigService.getConfig(this.repositoryName)
        .then(config => {
            this.repositoryConfig = config ? config : undefined;
            return this.repositoryConfig;
        });
    }

    getPipeline() : Promise<Pipeline> {
        return this.pipelinesRepositoryFacadeService.getPipeline(this.repositoryConfig, this.pipelineName)
        .then(pipeline => {
            this.pipeline = pipeline ? pipeline : undefined;
            return this.pipeline;
        });
    }

    getImage() : Promise<any> {
        return this.getRepositoryConfig()
        .then((config) => {
            if(!config)
                return null;

            return this.getPipeline()
            .then(pipeline => {
                if(!pipeline)
                    return null;

                return pipeline.logo;
            });
        });
    }

}
