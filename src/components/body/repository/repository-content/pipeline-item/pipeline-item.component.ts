import { Component, Input } from '@angular/core';

import { Repository, LocationType, EntityType } from '../../../../../entities/repository';
import { RepositoryService } from '../../../../../services/repository.service';
import { RepositoryConfig } from '../../../../../entities/repository-config';
import { RepositoryConfigService } from '../../../../../services/repository-config.service';

import { Pipeline } from '../../../../../entities/pipeline';
import { PipelinesRepositoryFacadeService } from '../../../../../services/pipelines-repository-facade.service';

import { OperationsManager } from '../../../../operations.manager';

@Component({
    selector: 'app-pipeline-item',
    templateUrl: './pipeline-item.component.html',
    styleUrls: ['./pipeline-item.component.scss']
})
export class PipelineItemComponent {

    @Input()
    pipelineName : string;
    @Input()
    repository : Repository;
    @Input()
    editable : boolean;



    constructor(private operationManager : OperationsManager) { }



    editClick() : Promise<any> {
        return this.operationManager.editPipeline(this.pipelineName, this.repository.repositoryName);
    }

    uploadClick(file : any) : Promise<any> {
        return this.operationManager.uploadPipeline(file, this.repository.repositoryName);
    }

    downloadClick() : Promise<any> {
        return this.operationManager.downloadPipeline(this.repository.repositoryName, this.pipelineName);
    }

    deleteClick() : Promise<any> {
        let pipeline = new Pipeline(this.pipelineName, null, null, null, null, null, null, null, null, null);
        return this.operationManager.deletePipeline(this.repository, pipeline);
    }

}
