import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';

import { RepositoryConfig } from '../../../entities/repository-config';
import { RepositoryConfigService } from '../../../services/repository-config.service';
import { Tool } from '../../../entities/tool';
import { ToolsRepositoryFacadeService } from '../../../services/tools-repository-facade.service';

export class EditToolDialogData {
    toolName : string;
    repositoryName : string;
}

@Component({
    selector: 'app-edit-tool-dialog',
    templateUrl: './edit-tool-dialog.component.html',
    styleUrls: ['./edit-tool-dialog.component.scss']
})
export class EditToolDialogComponent implements OnInit {

    toolName : string;
    repositoryName : string;

    config : RepositoryConfig;
    tool : Tool;
    logoData : any[];

    toolStr : string;

    loadEvent : Subject<any> = new Subject();



    constructor(public dialogRef: MatDialogRef<EditToolDialogComponent>,
                public repositoryConfigService : RepositoryConfigService,
                public toolsRepositoryFacadeService : ToolsRepositoryFacadeService,
                @Inject(MAT_DIALOG_DATA) public data: EditToolDialogData) {
        dialogRef.disableClose = true;

        this.toolName = data.toolName;
        this.repositoryName = data.repositoryName;
    }



    ngOnInit() {
        setTimeout(() => this.loadEvent.next());
    }

    load() : Promise<any> {
        return this.loadConfig()
        .then(config => {
            if(config)
                return this.loadTool()
                    .then(tool => this.writeTool(tool));
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

    loadTool() : Promise<Tool> {
        return this.toolsRepositoryFacadeService.getTool(this.config, this.toolName)
        .then(tool => {
            this.tool = tool;
            return tool;
        })
        .catch(error => {
            this.dialogRef.close({
                result : null,
                error : "Error getting Tool: " + this.toolName + " from Repository: " + this.repositoryName + "!" + error
            });

            throw error;
        });
    }

    changeImage(file : any) : Promise<any> {
        return this.readImageFile(file)
        .then(content => {
            let tool = this.readTool();

            tool.logo = content;

            this.writeTool(tool);
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

    readTool() : Tool {
        let tool = JSON.parse(this.toolStr);

        tool.logo = this.logoData;

        return tool;
    }

    writeTool(tool :  Tool) {
        this.logoData = tool.logo;

        delete tool.logo;
        this.toolStr = JSON.stringify(tool, null, 6);
    }

    saveClick() {
        this.dialogRef.close({
            result : this.readTool(),
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
