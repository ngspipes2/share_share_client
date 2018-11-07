import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../app/material.module';
import { FormsModule } from '@angular/forms';

import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';
import { DialogManager } from './dialog.manager';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { NewGroupNameDialogComponent } from './new-group-name-dialog/new-group-name-dialog.component';
import { NewRepositoryConfigNameDialogComponent } from './new-repository-config-name-dialog/new-repository-config-name-dialog.component';
import { SelectRepositoryConfigDialogComponent } from './select-repository-config-dialog/select-repository-config-dialog.component';
import { NewAccessTokenNameDialogComponent } from './new-access-token-name-dialog/new-access-token-name-dialog.component';

@NgModule({
  declarations: [
      SimpleDialogComponent,
      ChangePasswordDialogComponent,
      NewGroupNameDialogComponent,
      NewRepositoryConfigNameDialogComponent,
      SelectRepositoryConfigDialogComponent,
      NewAccessTokenNameDialogComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MaterialModule,
      FormsModule
  ],
  exports: [
      SimpleDialogComponent,
      ChangePasswordDialogComponent,
      NewGroupNameDialogComponent,
      NewRepositoryConfigNameDialogComponent,
      SelectRepositoryConfigDialogComponent,
      NewAccessTokenNameDialogComponent
  ],
  providers: [
      DialogManager
  ],
  entryComponents: [
      SimpleDialogComponent,
      ChangePasswordDialogComponent,
      NewGroupNameDialogComponent,
      NewRepositoryConfigNameDialogComponent,
      SelectRepositoryConfigDialogComponent,
      NewAccessTokenNameDialogComponent
  ]
})
export class DialogModule { }
