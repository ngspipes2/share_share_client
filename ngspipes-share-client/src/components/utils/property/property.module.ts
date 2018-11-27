import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../app/material.module';

import { PropertyComponent } from './property.component';
import { StringPropertyComponent } from './string-property/string-property.component';
import { NumberPropertyComponent } from './number-property/number-property.component';
import { DatePropertyComponent } from './date-property/date-property.component';
import { BooleanPropertyComponent } from './boolean-property/boolean-property.component';
import { LinkPropertyComponent } from './link-property/link-property.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    declarations: [
        PropertyComponent,
        StringPropertyComponent,
        NumberPropertyComponent,
        DatePropertyComponent,
        BooleanPropertyComponent,
        LinkPropertyComponent
    ],
    exports: [
        PropertyComponent,
        StringPropertyComponent,
        NumberPropertyComponent,
        DatePropertyComponent,
        BooleanPropertyComponent,
        LinkPropertyComponent
    ]
})
export class PropertyModule { }
