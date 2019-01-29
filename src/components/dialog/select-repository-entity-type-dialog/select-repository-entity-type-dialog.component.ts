import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { EntityType } from '../../../entities/repository';

@Component({
    selector: 'app-select-repository-entity-type-dialog',
    templateUrl: './select-repository-entity-type-dialog.component.html',
    styleUrls: ['./select-repository-entity-type-dialog.component.scss']
})
export class SelectRepositoryEntityTypeDialogComponent {

    options : any[] = [
        {value:EntityType.TOOLS, label:"Tools", icon:"build"},
        {value:EntityType.PIPELINES, label:"Pipelines", icon:"insert_drive_file"}
    ];



    constructor(private dialogRef : MatDialogRef<SelectRepositoryEntityTypeDialogComponent>) { }



    close(type : EntityType) {
        this.dialogRef.close({
            result: type,
            error: null
        });
    }

}
