import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../app/material.module';

import { DialogModule } from '../../../dialog/dialog.module';
import { ImageModule } from '../../../image/image.module';

import { RepositoryInfoComponent } from './repository-info/repository-info.component';

import { RepositoryProfileComponent } from './repository-profile.component';

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
        RepositoryProfileComponent,
        RepositoryInfoComponent
    ],
    exports: [
        RepositoryProfileComponent
    ]
})
export class RepositoryProfileModule { }
