import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../app/material.module';

import { WaitElementComponent } from './wait-element.component';
import { LoadElementComponent } from './load-element/load-element.component';
import { OperationIconButtonComponent } from './operation-icon-button/operation-icon-button.component';
import { OperationSelectFileTextButtonComponent } from './operation-select-file-text-button/operation-select-file-text-button.component';
import { OperationSelectFileIconButtonComponent } from './operation-select-file-icon-button/operation-select-file-icon-button.component';
import { OperationSlideToggleComponent } from './operation-slide-toggle/operation-slide-toggle.component';
import { OperationTextButtonComponent } from './operation-text-button/operation-text-button.component';
import { EventLoadElementComponent } from './event-load-element/event-load-element.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule
    ],
    declarations: [
        WaitElementComponent,
        LoadElementComponent,
        OperationIconButtonComponent,
        OperationSelectFileTextButtonComponent,
        OperationSelectFileIconButtonComponent,
        OperationSlideToggleComponent,
        OperationTextButtonComponent,
        EventLoadElementComponent
    ],
    exports: [
        WaitElementComponent,
        LoadElementComponent,
        OperationIconButtonComponent,
        OperationSelectFileTextButtonComponent,
        OperationSelectFileIconButtonComponent,
        OperationSlideToggleComponent,
        OperationTextButtonComponent,
        EventLoadElementComponent
    ]
})
export class WaitElementModule { }
