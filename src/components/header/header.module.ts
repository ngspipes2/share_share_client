import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../app/material.module';
import { FormsModule } from '@angular/forms';

import { ProfileButtonModule } from './profile-button/profile-button.module';
import { SearchBarModule } from './search-bar/search-bar.module';
import { ImageModule } from '../image/image.module';
import { DialogModule } from '../dialog/dialog.module';

import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [
      HeaderComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MaterialModule,
      FormsModule,
      ProfileButtonModule,
      SearchBarModule,
      ImageModule,
      DialogModule
  ],
  exports: [
      HeaderComponent
  ]
})
export class HeaderModule { }
