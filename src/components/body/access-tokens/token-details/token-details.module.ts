import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../app/material.module';

import { DialogModule } from '../../../dialog/dialog.module';
import { UtilsModule } from '../../../utils/utils.module';

import { TokenInfoComponent } from './token-info/token-info.component';

import { TokenDetailsComponent } from './token-details.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        DialogModule,
        UtilsModule
    ],
    declarations: [
        TokenDetailsComponent,
        TokenInfoComponent
    ],
    exports: [
        TokenDetailsComponent
    ]
})
export class TokenDetailsModule { }
