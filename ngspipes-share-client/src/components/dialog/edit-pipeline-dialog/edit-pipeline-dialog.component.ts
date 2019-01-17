import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';

import { RepositoryConfig } from '../../../entities/repository-config';
import { RepositoryConfigService } from '../../../services/repository-config.service';
import { Pipeline } from '../../../entities/pipeline';
import { PipelinesRepositoryFacadeService } from '../../../services/pipelines-repository-facade.service';

export class EditPipelineDialogData {
    pipelineName : string;
    repositoryName : string;
}

@Component({
    selector: 'app-edit-pipeline-dialog',
    templateUrl: './edit-pipeline-dialog.component.html',
    styleUrls: ['./edit-pipeline-dialog.component.scss']
})
export class EditPipelineDialogComponent implements OnInit {

    pipelineName : string;
    repositoryName : string;

    config : RepositoryConfig;
    pipeline : Pipeline;
    logoData : any[];

    pipelineStr : string;

    loadEvent : Subject<any> = new Subject();



    constructor(public dialogRef: MatDialogRef<EditPipelineDialogComponent>,
                public repositoryConfigService : RepositoryConfigService,
                public pipelinesRepositoryFacadeService : PipelinesRepositoryFacadeService,
                @Inject(MAT_DIALOG_DATA) public data: EditPipelineDialogData) {
        dialogRef.disableClose = true;

        this.pipelineName = data.pipelineName;
        this.repositoryName = data.repositoryName;
    }



    ngOnInit() {
        setTimeout(() => this.loadEvent.next());
    }

    load() : Promise<any> {
        return this.loadConfig()
        .then(config => {
            if(config)
                return this.loadPipeline()
                    .then(pipeline => this.writePipeline(pipeline));
        });
    }

    loadConfig() : Promise<RepositoryConfig> {
        return this.repositoryConfigService.getConfig(this.repositoryName)
        .then(config => {
            if(config)
                this.config = config;
            else
                this.dialogRef.close({
                    result : null,
                    error : "There is no Config for Repository: " + this.repositoryName + "!"
                });

            return config;
        })
        .catch(error => {
            this.dialogRef.close({
                result : null,
                error : "Error getting Config for Repository: " + this.repositoryName + "!" + error
            });

            throw error;
        });
    }

    loadPipeline() : Promise<Pipeline> {
        return this.pipelinesRepositoryFacadeService.getPipeline(this.config, this.pipelineName)
        .then(pipeline => {
            this.pipeline = pipeline;
            return pipeline;
        })
        .catch(error => {
            this.dialogRef.close({
                result : null,
                error : "Error getting Pipeline: " + this.pipelineName + " from Repository: " + this.repositoryName + "!" + error
            });

            throw error;
        });
    }

    changeImage(file : any) : Promise<any> {
        return this.readImageFile(file)
        .then(content => {
            let pipeline = this.readPipeline();

            pipeline.logo = content;

            this.writePipeline(pipeline);
        });
    }

    readImageFile(file) : Promise<any> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsBinaryString(file);

            reader.onload = () => resolve(btoa(reader.result));
            reader.onerror = error => reject(error);
        });
    }

    readPipeline() : Pipeline {
        let pipeline = JSON.parse(this.pipelineStr);

        pipeline.logo = this.logoData;

        return pipeline;
    }

    writePipeline(pipeline :  Pipeline) {
        this.logoData = pipeline.logo;

        delete pipeline.logo;
        this.pipelineStr = JSON.stringify(pipeline, null, 6);
    }

    saveClick() {
        this.dialogRef.close({
            result : this.readPipeline(),
            error : null
        });
    }

    cancelClick() {
        this.dialogRef.close({
            result : null,
            error : null
        })
    }

}
