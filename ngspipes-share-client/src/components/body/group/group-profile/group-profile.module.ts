import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../app/material.module';

import { DialogModule } from '../../../dialog/dialog.module';
import { ImageModule } from '../../../image/image.module';

import { GroupInfoComponent } from './group-info/group-info.component';

import { GroupProfileComponent } from './group-profile.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        DialogModule,
        ImageModule
    ],
    declarations: [
        GroupProfileComponent,
        GroupInfoComponent
    ],
    exports: [
        GroupProfileComponent
    ]
})
export class GroupProfileModule { }
