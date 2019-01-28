import { Component, Input, OnInit, OnChanges, OnDestroy, ViewChild } from '@angular/core';

import { RepositoryConfig } from '../../../entities/repository-config';
import { RepositoryConfigService } from '../../../services/repository-config.service';
import { Tool } from '../../../entities/tool';
import { ToolsRepositoryFacadeService } from '../../../services/tools-repository-facade.service';

import { LoadImageComponent } from '../load-image/load-image.component';

@Component({
    selector: 'app-tool-image',
    templateUrl: './tool-image.component.html',
    styleUrls: ['./tool-image.component.scss']
})
export class ToolImageComponent implements OnInit, OnChanges, OnDestroy {

    @ViewChild("loadImage")
    loadImage : LoadImageComponent;

    @Input()
    repositoryName : string;
    @Input()
    toolName : string;
    @Input()
    spinnerDiameter : number = 100;
    @Input()
    spinnerColor : string = "accent";
    @Input()
    circular : boolean = true;

    configSubscription : any;
    toolSubscription : any;

    repositoryConfig : RepositoryConfig;
    tool : Tool;



    constructor(private repositoryConfigService : RepositoryConfigService,
                private toolsRepositoryFacadeService : ToolsRepositoryFacadeService) {}



    ngOnInit() {
        this.configSubscription = this.repositoryConfigService.configEvent.subscribe((configRepositoryName) => {
            if(!this.repositoryConfig)
                this.loadImage.update();
            else if(this.repositoryConfig.repositoryName === configRepositoryName)
                this.loadImage.update();
        });

        this.toolSubscription = this.toolsRepositoryFacadeService.toolEvent.subscribe((id) => {
            if(id[0] === this.repositoryName && id[1] === this.toolName)
                this.loadImage.update();
        });
    }

    ngOnChanges() {
        this.loadImage.update();
    }

    ngOnDestroy() {
        this.configSubscription.unsubscribe();
        this.toolSubscription.unsubscribe();
    }

    getRepositoryConfig() : Promise<RepositoryConfig> {
        return this.repositoryConfigService.getConfig(this.repositoryName)
        .then(config => {
            this.repositoryConfig = config ? config : undefined;
            return this.repositoryConfig;
        });
    }

    getTool() : Promise<Tool> {
        return this.toolsRepositoryFacadeService.getTool(this.repositoryConfig, this.toolName)
        .then(tool => {
            this.tool = tool ? tool : undefined;
            return this.tool;
        });
    }

    getImage() : Promise<any> {
        return this.getRepositoryConfig()
        .then((config) => {
            if(!config)
                return null;

            return this.getTool()
            .then(tool => {
                if(!tool)
                    return null;

                return tool.logo;
            });
        });
    }

}
