import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { ToolFormat } from '../../../entities/tool';
import { ImportExportToolFormat, ArtefactType } from '../../../services/import-export.service';

@Component({
    selector: 'app-select-tool-format-dialog',
    templateUrl: './select-tool-format-dialog.component.html',
    styleUrls: ['./select-tool-format-dialog.component.scss']
})
export class SelectToolFormatDialogComponent {

    formats : ToolFormat[] = [];
    selectedFormat: ToolFormat;

    types : ArtefactType[] = [];
    selectedType : ArtefactType;



    constructor(private dialogRef : MatDialogRef<SelectToolFormatDialogComponent>) {
        Object.keys(ToolFormat).forEach(format => this.formats.push(format as ToolFormat));
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
            result: new ImportExportToolFormat(this.selectedFormat, this.selectedType),
            error: null
        });
    }

}
