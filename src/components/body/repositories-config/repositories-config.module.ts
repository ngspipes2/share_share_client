import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../../app/material.module';
import { FormsModule } from '@angular/forms';

import { DialogModule } from '../../dialog/dialog.module';

import { ConfigsListModule } from './configs-list/configs-list.module';
import { ConfigDetailsModule } from './config-details/config-details.module';

import { RepositoriesConfigComponent } from './repositories-config.component';

@NgModule({
  imports: [
      RouterModule,
      CommonModule,
      BrowserModule,
      BrowserAnimationsModule,
      MaterialModule,
      FormsModule,
      DialogModule,
      ConfigsListModule,
      ConfigDetailsModule
  ],
  declarations: [
      RepositoriesConfigComponent
  ],
  exports: [
      RepositoriesConfigComponent
  ]
})
export class RepositoriesConfigModule { }
