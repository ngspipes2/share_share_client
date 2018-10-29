import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../app/material.module';
import { FormsModule } from '@angular/forms';

import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';
import { DialogManager } from './dialog.manager';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';

@NgModule({
  declarations: [
      SimpleDialogComponent,
      ChangePasswordDialogComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MaterialModule,
      FormsModule
  ],
  exports: [
      SimpleDialogComponent,
      ChangePasswordDialogComponent
  ],
  providers: [
      DialogManager
  ],
  entryComponents: [
      SimpleDialogComponent,
      ChangePasswordDialogComponent
  ]
})
export class DialogModule { }
