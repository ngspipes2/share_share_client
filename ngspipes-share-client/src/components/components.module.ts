import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app/material.module';

import { ImageModule } from './image/image.module';
import { DialogModule } from './dialog/dialog.module';

const appRoutes: Routes = [ ];

@NgModule({
    declarations: [
    ],
    imports: [
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule.forRoot(appRoutes /*,{enableTracing: true//debugging purposes only}*/),
        ImageModule,
        DialogModule
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ],
    entryComponents : [
    ]
})

export class ComponentsModule { }
