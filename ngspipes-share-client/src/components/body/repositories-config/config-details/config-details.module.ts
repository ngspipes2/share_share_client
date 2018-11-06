import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../app/material.module';

import { DialogModule } from '../../../dialog/dialog.module';
import { ConfigDetailsComponent } from './config-details.component';
import { ConfigInfoComponent } from './config-info/config-info.component';

@NgModule({
  imports: [
      RouterModule,
      CommonModule,
      BrowserModule,
      BrowserAnimationsModule,
      MaterialModule,
      FormsModule,
      DialogModule
  ],
  declarations: [
      ConfigDetailsComponent,
      ConfigInfoComponent
  ],
  exports: [
      ConfigDetailsComponent
  ]
})
export class ConfigDetailsModule { }
