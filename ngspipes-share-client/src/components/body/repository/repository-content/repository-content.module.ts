import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../app/material.module';

import { DialogModule } from '../../../dialog/dialog.module';
import { ImageModule } from '../../../image/image.module';
import { UtilsModule } from '../../../utils/utils.module';

import { ListComponent } from './list/list.component';

import { RepositoryContentComponent } from './repository-content.component';
import { ToolItemComponent } from './tool-item/tool-item.component';
import { PipelineItemComponent } from './pipeline-item/pipeline-item.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        DialogModule,
        ImageModule,
        UtilsModule
    ],
    declarations: [
        ListComponent,
        RepositoryContentComponent,
        ToolItemComponent,
        PipelineItemComponent
    ],
    exports: [
        RepositoryContentComponent
    ]
})
export class RepositoryContentModule { }
