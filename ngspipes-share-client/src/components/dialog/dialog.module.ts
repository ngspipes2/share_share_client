import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../app/material.module';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';

import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';
import { DialogManager } from './dialog.manager';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { NewGroupNameDialogComponent } from './new-group-name-dialog/new-group-name-dialog.component';
import { NewRepositoryConfigNameDialogComponent } from './new-repository-config-name-dialog/new-repository-config-name-dialog.component';
import { SelectRepositoryConfigDialogComponent } from './select-repository-config-dialog/select-repository-config-dialog.component';
import { NewAccessTokenNameDialogComponent } from './new-access-token-name-dialog/new-access-token-name-dialog.component';
import { ShowTokenDialogComponent } from './show-token-dialog/show-token-dialog.component';
import { NewRepositoryNameDialogComponent } from './new-repository-name-dialog/new-repository-name-dialog.component';
import { NewRepositoryLocationDialogComponent } from './new-repository-location-dialog/new-repository-location-dialog.component';
import { SelectRepositoryEntityTypeDialogComponent } from './select-repository-entity-type-dialog/select-repository-entity-type-dialog.component';

@NgModule({
  declarations: [
      SimpleDialogComponent,
      ChangePasswordDialogComponent,
      NewGroupNameDialogComponent,
      NewRepositoryConfigNameDialogComponent,
      SelectRepositoryConfigDialogComponent,
      NewAccessTokenNameDialogComponent,
      ShowTokenDialogComponent,
      NewRepositoryNameDialogComponent,
      NewRepositoryLocationDialogComponent,
      SelectRepositoryEntityTypeDialogComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MaterialModule,
      FormsModule,
      ClipboardModule
  ],
  exports: [
      SimpleDialogComponent,
      ChangePasswordDialogComponent,
      NewGroupNameDialogComponent,
      NewRepositoryConfigNameDialogComponent,
      SelectRepositoryConfigDialogComponent,
      NewAccessTokenNameDialogComponent,
      ShowTokenDialogComponent,
      NewRepositoryNameDialogComponent,
      NewRepositoryLocationDialogComponent,
      SelectRepositoryEntityTypeDialogComponent
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
      NewAccessTokenNameDialogComponent,
      ShowTokenDialogComponent,
      NewRepositoryNameDialogComponent,
      NewRepositoryLocationDialogComponent,
      SelectRepositoryEntityTypeDialogComponent
  ]
})
export class DialogModule { }
