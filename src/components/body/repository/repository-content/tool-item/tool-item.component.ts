import { Component, Input } from '@angular/core';

import { Repository, LocationType, EntityType } from '../../../../../entities/repository';
import { RepositoryService } from '../../../../../services/repository.service';
import { RepositoryConfig } from '../../../../../entities/repository-config';
import { RepositoryConfigService } from '../../../../../services/repository-config.service';

import { Tool } from '../../../../../entities/tool';
import { ToolsRepositoryFacadeService } from '../../../../../services/tools-repository-facade.service';

import { OperationsManager } from '../../../../operations.manager';

@Component({
    selector: 'app-tool-item',
    templateUrl: './tool-item.component.html',
    styleUrls: ['./tool-item.component.scss']
})
export class ToolItemComponent {

    @Input()
    toolName : string;
    @Input()
    repository : Repository;
    @Input()
    editable : boolean;



    constructor(private operationManager : OperationsManager) { }



    editClick() : Promise<any> {
        return this.operationManager.editTool(this.toolName, this.repository.repositoryName);
    }

    uploadClick(file : any) : Promise<any> {
        return this.operationManager.uploadTool(file, this.repository.repositoryName);
    }

    downloadClick() : Promise<any> {
        return this.operationManager.downloadTool(this.repository.repositoryName, this.toolName);
    }

    deleteClick() : Promise<any> {
        let tool = new Tool(this.toolName, null, null, null, null, null, null, null);
        return this.operationManager.deleteTool(this.repository, tool);
    }

}
