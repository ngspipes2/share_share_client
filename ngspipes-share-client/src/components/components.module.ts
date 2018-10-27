import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app/material.module';

import { SimpleDialogComponent } from './dialog/simple-dialog/simple-dialog.component';
import { DialogManager } from './dialog/dialog.manager';

@NgModule({
    declarations: [
        SimpleDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    exports: [
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
