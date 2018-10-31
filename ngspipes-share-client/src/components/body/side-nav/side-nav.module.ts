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
import { SideNavComponent } from './side-nav.component';

@NgModule({
    declarations: [
        GroupItemComponent,
        MyGroupsListComponent,
        MyGroupsComponent,
        SideNavComponent,
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
