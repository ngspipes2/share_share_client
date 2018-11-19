import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../app/material.module';

import { DialogModule } from '../../../dialog/dialog.module';
import { ImageModule } from '../../../image/image.module';
import { EntitiesFrameModule } from '../../entities-frame/entities-frame.module';

import { ListItemComponent } from './list-item/list-item.component';
import { ListComponent } from './list/list.component';

import { GroupMembersComponent } from './group-members.component';


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
        EntitiesFrameModule
    ],
    declarations: [
        GroupMembersComponent,
        ListComponent,
        ListItemComponent
    ],
    exports: [
        GroupMembersComponent
    ]
})
export class GroupMembersModule { }
