import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';

import { ImageModule } from '../image/image.module';

import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';
import { DialogManager } from './dialog.manager';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { NewGroupNameDialogComponent } from './new-group-name-dialog/new-group-name-dialog.component';
import { SelectRepositoryConfigDialogComponent } from './select-repository-config-dialog/select-repository-config-dialog.component';
import { NewAccessTokenNameDialogComponent } from './new-access-token-name-dialog/new-access-token-name-dialog.component';
import { ShowTokenDialogComponent } from './show-token-dialog/show-token-dialog.component';
import { NewRepositoryNameDialogComponent } from './new-repository-name-dialog/new-repository-name-dialog.component';
import { NewRepositoryLocationDialogComponent } from './new-repository-location-dialog/new-repository-location-dialog.component';
import { SelectRepositoryEntityTypeDialogComponent } from './select-repository-entity-type-dialog/select-repository-entity-type-dialog.component';
import { SelectUserDialogComponent } from './select-user-dialog/select-user-dialog.component';
import { SelectGroupDialogComponent } from './select-group-dialog/select-group-dialog.component';
import { SelectRepositoryDialogComponent } from './select-repository-dialog/select-repository-dialog.component';
import { NewToolNameDialogComponent } from './new-tool-name-dialog/new-tool-name-dialog.component';
import { NewPipelineNameDialogComponent } from './new-pipeline-name-dialog/new-pipeline-name-dialog.component';

@NgModule({
  declarations: [
      SimpleDialogComponent,
      ChangePasswordDialogComponent,
      NewGroupNameDialogComponent,
      SelectRepositoryConfigDialogComponent,
      NewAccessTokenNameDialogComponent,
      ShowTokenDialogComponent,
      NewRepositoryNameDialogComponent,
      NewRepositoryLocationDialogComponent,
      SelectRepositoryEntityTypeDialogComponent,
      SelectUserDialogComponent,
      SelectGroupDialogComponent,
      SelectRepositoryDialogComponent,
      NewToolNameDialogComponent,
      NewPipelineNameDialogComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
      ClipboardModule,
      ImageModule
  ],
  exports: [
      SimpleDialogComponent,
      ChangePasswordDialogComponent,
      NewGroupNameDialogComponent,
      SelectRepositoryConfigDialogComponent,
      NewAccessTokenNameDialogComponent,
      ShowTokenDialogComponent,
      NewRepositoryNameDialogComponent,
      NewRepositoryLocationDialogComponent,
      SelectRepositoryEntityTypeDialogComponent,
      SelectUserDialogComponent,
      SelectGroupDialogComponent,
      SelectRepositoryDialogComponent,
      NewToolNameDialogComponent,
      NewPipelineNameDialogComponent
  ],
  providers: [
      DialogManager
  ],
  entryComponents: [
      SimpleDialogComponent,
      ChangePasswordDialogComponent,
      NewGroupNameDialogComponent,
      SelectRepositoryConfigDialogComponent,
      NewAccessTokenNameDialogComponent,
      ShowTokenDialogComponent,
      NewRepositoryNameDialogComponent,
      NewRepositoryLocationDialogComponent,
      SelectRepositoryEntityTypeDialogComponent,
      SelectUserDialogComponent,
      SelectGroupDialogComponent,
      SelectRepositoryDialogComponent,
      NewToolNameDialogComponent,
      NewPipelineNameDialogComponent
  ]
})
export class DialogModule { }
