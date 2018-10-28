import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app/material.module';

import{ ImageModule } from './image/image.module';

import { SimpleDialogComponent } from './dialog/simple-dialog/simple-dialog.component';
import { DialogManager } from './dialog/dialog.manager';

const appRoutes: Routes = [ ];

@NgModule({
    declarations: [
        SimpleDialogComponent
    ],
    imports: [
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule.forRoot(appRoutes /*,{enableTracing: true//debugging purposes only}*/),
        ImageModule
    ],
    exports: [
        RouterModule,
        SimpleDialogComponent
    ],
    providers: [
        DialogManager
    ],
    entryComponents : [
        SimpleDialogComponent
    ]
})

export class ComponentsModule { }
