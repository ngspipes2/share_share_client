import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { ToolFormat } from '../../../entities/tool';

@Component({
    selector: 'app-select-tool-format-dialog',
    templateUrl: './select-tool-format-dialog.component.html',
    styleUrls: ['./select-tool-format-dialog.component.scss']
})
export class SelectToolFormatDialogComponent {

    formats : ToolFormat[] = [];
    selectedFormat: ToolFormat;



    constructor(private dialogRef : MatDialogRef<SelectToolFormatDialogComponent>) {
        Object.keys(ToolFormat).forEach(format => this.formats.push(format as ToolFormat));
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
