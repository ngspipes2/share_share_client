import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../../app/material.module';
import { FormsModule } from '@angular/forms';

import { ImageModule } from '../../image/image.module';
import { DialogModule } from '../../dialog/dialog.module';

import { MyGroupsListComponent } from './my-groups/my-groups-list/my-groups-list.component';
import { GroupItemComponent } from './my-groups/group-item/group-item.component';
import { MyGroupsComponent } from './my-groups/my-groups.component';

import { ToolsRepositoryItemComponent } from './my-tools-repositories/tools-repository-item/tools-repository-item.component';
import { MyToolsRepositoriesListComponent } from './my-tools-repositories/my-tools-repositories-list/my-tools-repositories-list.component';
import { MyToolsRepositoriesComponent } from './my-tools-repositories/my-tools-repositories.component';

import { PipelinesRepositoryItemComponent } from './my-pipelines-repositories/pipelines-repository-item/pipelines-repository-item.component';
import { MyPipelinesRepositoriesListComponent } from './my-pipelines-repositories/my-pipelines-repositories-list/my-pipelines-repositories-list.component';
import { MyPipelinesRepositoriesComponent } from './my-pipelines-repositories/my-pipelines-repositories.component';

import { SideNavComponent } from './side-nav.component';

@NgModule({
    declarations: [
        GroupItemComponent,
        MyGroupsListComponent,
        MyGroupsComponent,
        ToolsRepositoryItemComponent,
        MyToolsRepositoriesListComponent,
        MyToolsRepositoriesComponent,
        PipelinesRepositoryItemComponent,
        MyPipelinesRepositoriesListComponent,
        MyPipelinesRepositoriesComponent,
        SideNavComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        ImageModule,
        DialogModule
    ],
    exports: [
        SideNavComponent
    ]
})
export class SideNavModule { }
