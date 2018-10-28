import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app/material.module';

import { SimpleDialogComponent } from './dialog/simple-dialog/simple-dialog.component';
import { DialogManager } from './dialog/dialog.manager';
import { UserImageComponent } from './image/user-image/user-image.component';

const appRoutes: Routes = [ ];

@NgModule({
    declarations: [
        SimpleDialogComponent,
        UserImageComponent
    ],
    imports: [
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule.forRoot(appRoutes /*,{enableTracing: true//debugging purposes only}*/)
    ],
    exports: [
        RouterModule,
        SimpleDialogComponent,
        UserImageComponent
    ],
    providers: [
        DialogManager
    ],
    entryComponents : [
        SimpleDialogComponent
    ]
})

export class ComponentsModule { }
