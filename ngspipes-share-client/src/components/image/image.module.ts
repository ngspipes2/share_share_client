import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../app/material.module';

import { LoadImageComponent } from './load-image/load-image.component';
import { UserImageComponent } from './user-image/user-image.component';
import { GroupImageComponent } from './group-image/group-image.component';
import { RepositoryImageComponent } from './repository-image/repository-image.component';

@NgModule({
  declarations: [
      LoadImageComponent,
      UserImageComponent,
      GroupImageComponent,
      RepositoryImageComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MaterialModule
  ],
  exports: [
      LoadImageComponent,
      UserImageComponent,
      GroupImageComponent,
      RepositoryImageComponent
  ]
})
export class ImageModule { }
