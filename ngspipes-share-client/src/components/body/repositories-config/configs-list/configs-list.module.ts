import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../app/material.module';

import { DialogModule } from '../../../dialog/dialog.module';

import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ConfigsListComponent } from './configs-list.component';

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
      ListComponent,
      ListItemComponent,
      ConfigsListComponent
  ],
  exports: [
      ConfigsListComponent
  ]
})
export class ConfigsListModule { }
