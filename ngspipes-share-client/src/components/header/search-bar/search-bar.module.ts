import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../../app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ImageModule } from '../../image/image.module';
import { DialogModule } from '../../dialog/dialog.module';

import { UserItemComponent } from './user-item/user-item.component';
import { GroupItemComponent } from './group-item/group-item.component';
import { SearchBarComponent } from './search-bar.component';
import { ExternalRepositoryItemComponent } from './external-repository-item/external-repository-item.component';
import { InternalRepositoryItemComponent } from './internal-repository-item/internal-repository-item.component';

@NgModule({
  declarations: [
      UserItemComponent,
      GroupItemComponent,
      SearchBarComponent,
      ExternalRepositoryItemComponent,
      InternalRepositoryItemComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      ImageModule,
      DialogModule
  ],
  exports: [
      SearchBarComponent
  ]
})
export class SearchBarModule { }
