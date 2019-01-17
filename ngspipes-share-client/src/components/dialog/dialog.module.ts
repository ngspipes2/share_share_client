import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { NgJsonEditorModule } from 'ang-jsoneditor'

import { ImageModule } from '../image/image.module';
import { UtilsModule } from '../utils/utils.module';

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
import { SelectToolsFromRepositoryDialogComponent } from './select-tools-from-repository-dialog/select-tools-from-repository-dialog.component';
import { SelectPipelinesFromRepositoryDialogComponent } from './select-pipelines-from-repository-dialog/select-pipelines-from-repository-dialog.component';
import { CloneToolsDialogComponent } from './clone-tools-dialog/clone-tools-dialog.component';
import { ClonePipelinesDialogComponent } from './clone-pipelines-dialog/clone-pipelines-dialog.component';
import { SelectToolFormatDialogComponent } from './select-tool-format-dialog/select-tool-format-dialog.component';
import { SelectPipelineFormatDialogComponent } from './select-pipeline-format-dialog/select-pipeline-format-dialog.component';
import { UploadToolsDialogComponent } from './upload-tools-dialog/upload-tools-dialog.component';
import { UploadPipelinesDialogComponent } from './upload-pipelines-dialog/upload-pipelines-dialog.component';
import { EditToolDialogComponent } from './edit-tool-dialog/edit-tool-dialog.component';
import { EditPipelineDialogComponent } from './edit-pipeline-dialog/edit-pipeline-dialog.component';

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
      NewPipelineNameDialogComponent,
      SelectToolsFromRepositoryDialogComponent,
      SelectPipelinesFromRepositoryDialogComponent,
      CloneToolsDialogComponent,
      ClonePipelinesDialogComponent,
      SelectToolFormatDialogComponent,
      SelectPipelineFormatDialogComponent,
      UploadToolsDialogComponent,
      UploadPipelinesDialogComponent,
      EditToolDialogComponent,
      EditPipelineDialogComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
      ClipboardModule,
      ImageModule,
      UtilsModule,
      NgJsonEditorModule
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
      NewPipelineNameDialogComponent,
      SelectToolsFromRepositoryDialogComponent,
      SelectPipelinesFromRepositoryDialogComponent,
      CloneToolsDialogComponent,
      ClonePipelinesDialogComponent,
      SelectToolFormatDialogComponent,
      SelectPipelineFormatDialogComponent,
      UploadToolsDialogComponent,
      UploadPipelinesDialogComponent,
      EditToolDialogComponent,
      EditPipelineDialogComponent
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
      NewPipelineNameDialogComponent,
      SelectToolsFromRepositoryDialogComponent,
      SelectPipelinesFromRepositoryDialogComponent,
      CloneToolsDialogComponent,
      ClonePipelinesDialogComponent,
      SelectToolFormatDialogComponent,
      SelectPipelineFormatDialogComponent,
      UploadToolsDialogComponent,
      UploadPipelinesDialogComponent,
      EditToolDialogComponent,
      EditPipelineDialogComponent
  ]
})
export class DialogModule { }
