import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../app/material.module';

import { PropertyModule } from './property/property.module';

import { FrameComponent } from './frame/frame.component';
import { OperationElementComponent } from './operation-element/operation-element.component';
import { NonExistentEntityComponent } from './non-existent-entity/non-existent-entity.component';
import { FilterListComponent } from './filter-list/filter-list.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        PropertyModule
    ],
    declarations: [
        FrameComponent,
        OperationElementComponent,
        NonExistentEntityComponent,
        FilterListComponent
    ],
    exports: [
        PropertyModule,
        FrameComponent,
        OperationElementComponent,
        NonExistentEntityComponent,
        FilterListComponent
    ]
})
export class UtilsModule { }
