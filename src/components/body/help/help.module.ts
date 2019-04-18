import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../app/material.module';
import { MatVideoModule } from 'mat-video';

import { HelpComponent } from './help.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { TutorialsComponent } from './tutorials/tutorials.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        MatVideoModule
    ],
    declarations: [
        HelpComponent,
        TutorialComponent,
        TutorialsComponent
    ],
    exports: [
        HelpComponent
    ]
})
export class HelpModule { }
