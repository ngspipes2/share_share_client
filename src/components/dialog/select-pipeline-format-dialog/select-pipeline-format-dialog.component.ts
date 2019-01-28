import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { PipelineFormat } from '../../../entities/pipeline';

@Component({
    selector: 'app-select-pipeline-format-dialog',
    templateUrl: './select-pipeline-format-dialog.component.html',
    styleUrls: ['./select-pipeline-format-dialog.component.scss']
})
export class SelectPipelineFormatDialogComponent {

    formats : PipelineFormat[] = [];
    selectedFormat : PipelineFormat;



    constructor(private dialogRef : MatDialogRef<SelectPipelineFormatDialogComponent>) {
        Object.keys(PipelineFormat).forEach(format => this.formats.push(format as PipelineFormat));
        this.selectedFormat = this.formats[0];
    }



    getFormatIcon(format) : string {
        return "insert_drive_file";
    }

    selectClicked() {
        this.dialogRef.close({
            result: this.selectedFormat,
            error: null
        });
    }

}
