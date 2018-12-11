import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../app/material.module';

import {  UtilsModule } from '../utils/utils.module';

import { LoadImageComponent } from './load-image/load-image.component';
import { UserImageComponent } from './user-image/user-image.component';
import { GroupImageComponent } from './group-image/group-image.component';
import { RepositoryImageComponent } from './repository-image/repository-image.component';
import { ToolImageComponent } from './tool-image/tool-image.component';
import { PipelineImageComponent } from './pipeline-image/pipeline-image.component';

@NgModule({
  declarations: [
      LoadImageComponent,
      UserImageComponent,
      GroupImageComponent,
      RepositoryImageComponent,
      ToolImageComponent,
      PipelineImageComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MaterialModule,
      UtilsModule
  ],
  exports: [
      LoadImageComponent,
      UserImageComponent,
      GroupImageComponent,
      RepositoryImageComponent,
      ToolImageComponent,
      PipelineImageComponent
  ]
})
export class ImageModule { }
