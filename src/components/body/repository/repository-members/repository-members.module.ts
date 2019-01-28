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

import { UserMemberItemComponent } from './user-member-item/user-member-item.component';
import { GroupMemberItemComponent } from './group-member-item/group-member-item.component';
import { ListComponent } from './list/list.component';

import { RepositoryMembersComponent } from './repository-members.component';

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
        RepositoryMembersComponent,
        ListComponent,
        UserMemberItemComponent,
        GroupMemberItemComponent
    ],
    exports: [
        RepositoryMembersComponent
    ]
})
export class RepositoryMembersModule { }
