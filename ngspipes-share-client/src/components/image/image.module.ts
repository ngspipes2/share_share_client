import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../app/material.module';

import { UserImageComponent } from './user-image/user-image.component';
import { GroupImageComponent } from './group-image/group-image.component';
import { ExternalRepositoryImageComponent } from './external-repository-image/external-repository-image.component';
import { InternalRepositoryImageComponent } from './internal-repository-image/internal-repository-image.component';

@NgModule({
  declarations: [
      UserImageComponent,
      GroupImageComponent,
      ExternalRepositoryImageComponent,
      InternalRepositoryImageComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MaterialModule
  ],
  exports: [
      UserImageComponent,
      GroupImageComponent,
      ExternalRepositoryImageComponent,
      InternalRepositoryImageComponent
  ]
})
export class ImageModule { }
