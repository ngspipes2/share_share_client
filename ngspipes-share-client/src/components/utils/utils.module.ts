import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../app/material.module';

import { FrameComponent } from './frame/frame.component';
import { OperationElementComponent } from './operation-element/operation-element.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule
    ],
    declarations: [
        FrameComponent,
        OperationElementComponent
    ],
    exports: [
        FrameComponent,
        OperationElementComponent
    ]
})
export class UtilsModule { }
