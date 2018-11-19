import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../app/material.module';

import { EntitiesFrameComponent } from './entities-frame.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule
    ],
    declarations: [
        EntitiesFrameComponent
    ],
    exports: [
        EntitiesFrameComponent
    ]
})
export class EntitiesFrameModule { }
