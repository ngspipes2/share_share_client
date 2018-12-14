import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { PipelineFormat } from '../../../entities/pipeline';
import { ImportExportPipelineFormat, ArtefactType } from '../../../services/import-export.service';

@Component({
    selector: 'app-select-pipeline-format-dialog',
    templateUrl: './select-pipeline-format-dialog.component.html',
    styleUrls: ['./select-pipeline-format-dialog.component.scss']
})
export class SelectPipelineFormatDialogComponent {

    formats : PipelineFormat[] = [];
    selectedFormat : PipelineFormat;

    types : ArtefactType[] = [];
    selectedType : ArtefactType;



    constructor(private dialogRef : MatDialogRef<SelectPipelineFormatDialogComponent>) {
        Object.keys(PipelineFormat).forEach(format => this.formats.push(format as PipelineFormat));
        this.selectedFormat = this.formats[0];

        Object.keys(ArtefactType).forEach(type => this.types.push(type as ArtefactType));
        this.selectedType = this.types[0];
    }



    getFormatIcon(format) : string {
        return "insert_drive_file";
    }

    getTypeIcon(type) : string {
        return type === ArtefactType.FILE ? "insert_drive_file" : "folder";
    }

    selectClicked() {
        this.dialogRef.close({
            result: new ImportExportPipelineFormat(this.selectedFormat, this.selectedType),
            error: null
        });
    }

}
